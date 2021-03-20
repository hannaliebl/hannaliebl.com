+++
blogcategories = ["JavaScript"]
blogtags = ["AngularJS", "Unit Testing", "Jasmine", "Promises"]
date = "2016-08-16T13:49:01-07:00"
draft = false
featured = ["true"]
featured_img = "/img/mocking-angular-dependencies.png"
summary = "How to unit test an Angular 1 controller with injected dependencies."
title = "Mocking Dependencies in Angular 1 Unit Tests"

+++

Unit testing, by definition, is testing a unit of code at a time. I find one of the most difficult parts of writing unit tests for Angular 1.xx is successfully mocking out injected dependencies, like a data service a controller might call. You can inject those actual dependencies and call them from your tests, but then you are depending on their implementation to be correct inside a test that is supposed to be for a different isolated unit of code. The best way to avoid this is to mock your dependencies, either by using Angular's own `$provide` service or mocking just the values that are returned from them.

I wrote a very small example app and some tests for it–the code is available on [Plunkr](https://plnkr.co/edit/Q1IVXG?p=preview). The example app is a kitten adoption app–it shows a list of kittens available for adoption and includes a view controller that calls some services. We will focus on testing the controller and mocking the dependencies that are used in it. I'm assuming that you know the basics of how Angular works and how to get a test suite set up and running. I used Angular 1.5 and Jasmine 2.0 in my code examples, and you need ng-mock included after Angular to write your own mocks.

## Mocking with `$provide`

`$provide` works in tandem with Angular's dependency injection. You include a `$provide` block before your injection block in tests to override the values that you are injecting with your own values. These values can be any type of Angular provider: a factory, service, constant, etc. With `$provide`, you have complete control over what, say, a factory returns. A common practice is to have the return value of the mocked service method be a Jasmine spy: you can then track if the service was called, and using Jasmine's `returnValue` method, you can also return whatever you like when the service is called in your tests.

Let's look at some code! I have a simple view controller, something that you would find like this: `<div ng-controller="kittenViewCtrl as kittenViewCtrl">` in the main view of the application. The controller's job is to call a service (`kittensAvailableService`) that returns a JSON list of all kittens available for adoption. The controller also has access to an `alertService` in case the HTTP call goes awry, and that service returns an error message that we then display in our app by assigning it to the view controller.

How do we test that the `alertService` gets called on error? Remember, we don't care what the `alertService` does–hopefully another unit test would cover that, but from the controller test's perspective, we just want to test that `alertService` has been called and that the value it returns is used properly by the controller. This is the perfect opportunity to mock the service with `$provide`, track that it has been called using a Jasmine spy, and return a known value using Jasmine's `returnValue` method.

Here is how we mock `alertService` using `$provide`:

```javascript
beforeEach(function () {
  module(function ($provide) {
    $provide.factory("alertService", function () {
      var newAlert = jasmine.createSpy().and.returnValue("An error");
      return { newAlert: newAlert };
    });
  });
});
```

This goes before the inject function in the tests. We basically write a mini Angular factory whose one method is a Jasmine spy that returns a value we provide (in this case, just a string representing an error message.)

We still have to inject the `alertService` in the inject block, but because of our previous setup, when we use `alertService` in our tests, it will call the mocked version. Here is our inject block, where we make sure to include `alertService`.

```javascript
beforeEach(inject(function (
  $rootScope,
  $controller,
  $q,
  _alertService_,
  _kittensAvailableService_
) {
  $scope = $rootScope.$new();
  deferred = $q.defer();
  alertService = _alertService_;
  kittensAvailableService = _kittensAvailableService_;
  spyOn(kittensAvailableService, "gatherKittens").and.returnValue(
    deferred.promise
  );
  kittenViewCtrl = $controller("kittenViewCtrl");
}));
```

Finally, here are the tests that use the mock we wrote:

```javascript
it("calls the alertService", function () {
  expect(alertService.newAlert).toHaveBeenCalled();
});
it("sets the alert value to the returned value from alertService.newAlert", function () {
  expect(kittenViewCtrl.alert).toEqual("An error");
});
```

Because alertService.newAlert is a Jasmine spy, we can assert that it has been called, and we test that it equals the string that we returned in out mock.

## Mocking with Promises

The `alertService` even being called depends upon the failure of the promise that gets returned from the `kittensAvailableService`, an intermediate service that, in my little app, returns a promise from an http handler and does some sorting and filtering on the data. Instead of mocking out the whole `kittensAvailableService`, I can just have it return a promise, and then I have control over the reject and resolve states as well as the data that comes out of it. Again, I don't want to test the way the `kittensAvailableService` works in my controller tests, I just want to test that my controller's interactions with the service are correct.

We will again leverage Jasmine's ability to return a value from a spied upon function. First, I have to actually get a promise object to return. I inject Angular's own `$q` service in the inject block and use it to create a `deferred` object: `deferred = $q.defer()` In the same inject block, I spy on the `kittensAvailableService` and return the promise from the deferred object:

```javascript
spyOn(kittensAvailableService, "gatherKittens").and.returnValue(
  deferred.promise
);
```

Now I can test both the promise resolving successfully and unsuccessfully. The key, after either resolving or rejecting the promise, is to call `$scope.$apply()` to trigger a digest cycle, because the results of a promise in Angular are propagated asynchronously. Generally I put the promise resolution inside of a `beforeEach()` function block so I don't have to continually resolve or reject my promise and call `$scope.$apply()` in each of my individual tests.

Below are the tests for the successful promise resolution. I can resolve the value returned from the promise with whatever I like, which is perfect, since I don't want to depend upon the actual service to give me a value.

```javascript
describe("on successful data call", function () {
  beforeEach(function () {
    deferred.resolve([{ foo: "foo" }, { bar: "bar" }]);
    $scope.$apply();
  });
  it("sets kittens to the value of the response", function () {
    expect(kittenViewCtrl.kittens).toEqual([{ foo: "foo" }, { bar: "bar" }]);
  });
  it("sets loading to false", function () {
    expect(kittenViewCtrl.loading).toEqual(false);
  });
});
```

And below are the tests for the unsuccessful promise resolution (this is where I test that `alertService` has been called, like we went over in the first section of this post.)

```javascript
describe("on unsuccessful data call", function () {
  beforeEach(function () {
    deferred.reject({ error: "some error" });
    $scope.$apply();
  });
  it("leave kittens value unchanged", function () {
    expect(kittenViewCtrl.kittens).toEqual([]);
  });
  it("calls the alertService", function () {
    expect(alertService.newAlert).toHaveBeenCalled();
  });
  it("sets the alert value to the returned value from alertService.newAlert", function () {
    expect(kittenViewCtrl.alert).toEqual("An error");
  });
  it("sets loading to false", function () {
    expect(kittenViewCtrl.loading).toEqual(false);
  });
});
```

By using `$provide`, Jasmine's helpful `spyOn`, `createSpy`, and `returnValue` methods, and mocking promises using Angular's own `$q` service, you should be able to mock just about any dependency in Angular unit tests. I often find doing this helps me really just focus on testing the actual subject at hand, which is what unit tests are all about.

If you made it this far enjoy this kitten photo, since the test examples were all from a kitten adoption app, after all!

<div class="text-center inline-image-container">
  <img src="/img/adopt-dont-shop.jpg" alt="Sleeping kittens." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">You could have actually adopted these guys from the Oregon Humane Society a few months ago.</div>
  </div>
</div>
