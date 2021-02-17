+++
date = 2020-04-13T09:23:39-05:00
draft = false
title = "Incrementally Migrating From AngularJS to React"
blogcategories = ["JavaScript"]
blogtags = ["Conference Talk", "React", "AngularJS", "Redux"]
featured = ["true"]
summary = "The second part of a series where I summarize a conference talk I gave in March 2020. This covers the technical details of how my team incrementally moved two apps from AngularJS to React."
featured_img = "/img/plans-page-conversion-illustration.png"
+++

This is the second of a two-part series summarizing a conference talk I gave in March 2020 at [NERD Summit](https://2020.nerdsummit.org/). Please see the [previous post](../evergreen-software-development-shipping-a-redesign-of-enrollment-apps-on-healthcare-dot-gov) for the background and story of the applications my team updated/redesigned on healthcare.gov. This post is the technical details of how we moved from AngularJS to React, and could also serve as a guide for other teams doing this type of work.

## The UI: Start With the Outer Leaves

If you've decided to incrementally rewrite an app from AngularJS to React, there are only two methods I can see: either take your existing AngularJS app and start to replace parts of it with React or somehow build a React app alongside or on top of the AngularJS app. For us, it didn’t make much sense to deal with the problem of rendering AngularJS inside of React. We wanted to convert something to React and then not worry about working with any AngularJS inside of it. So we did the opposite and rendered React inside of AngularJS.

A website or web app is a tree of DOM nodes, and JavaScript libraries or frameworks that help you build web apps structure their UI level in the same way. So you can think of your app as a tree of components. A conversion would start with the outermost leaves of that tree, and convert those UI components to React components, and then slowly work our way up the component tree. We used a library called [ngReact](https://github.com/ngReact/ngReact) to render React inside of our AngularJS views.

<div class="text-center inline-image-container">
  <img src="/img/tree-of-components-angular-to-react.png" alt="" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">An app is a tree of components, and we begin by converting the outermost leaves to React.</div>
  </div>
</div>

For a concrete example, consider the list of plan cards that display health insurance plans. We would start with the smallest piece, say, the plan card’s header, and convert that to a small React component. We would pass in the plan’s name from outside of React, so from AngularJS, but as time goes on, and other parts of the card become React, fewer things need to be passed in from AngularJS. Slowly the React components become more complex and handle their own state. Eventually. all the plan cards are in React, then the list of plans itself, then the header that displays filtering options, and eventually the entire page is one big React component that may still take in some state from AngularJS to communicate with other parts of the Angular app, but all of a sudden significant portions of the HTML that the app renders are all being controlled by React.

<div class="text-center inline-image-container img-expanded-container">
  <img src="/img/plans-page-conversion-illustration.png" alt="" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">An illustration of converting leaves of the component tree to React over time.</div>
  </div>
</div>

## Using ngReact

**Sidenote:** *ngReact is no longer being actively worked on, and the repository is archived. This happened near the end of our migration and didn't end up hindering us. This does mean if you decide to use ngReact today or in the future, you will not get issues addressed or bugs fixed, but I still think for a use-case like ours, it was (and is) a fine solution.*

One way to use ngReact is to write an Angular directive whose only job is then to render a React component. This is how we added React to our AngularJS apps: by using the factory that ngReact provides called `reactDirective` to create AngularJS directives that then rendered React components.

This is the directive definition itself. We want to render the React `<PlanCard />` by using a directive called `<plan-card></plan-card>`.
~~~javascript
// import the React component
import PlanCard from "../components/PlanCard";

// create the directive with the reactDirective factory
const planCardDirective = (reactDirective, $ngRedux) =>
  reactDirective("PlanCard", ["title", "anotherProp"], undefined, { store: $ngRedux });
planCardDirective.$inject = ["reactDirective", "$ngRedux"];

// register the directive as plan-card
angular.module("myApp.directives")
  .factory("PlanCard", () => PlanCard)
  // the first parameter here is us registering this name in Angular. planCard becomes 
  // plan-card in Angular's directive naming convention
  .directive("planCard", planCardDirective)
~~~
`reactDirective` takes four parameters. First, the name of the React component you are binding to this directive. Next, an array of the name of any props that will be passed in (by default, ngReact looks to propTypes in the React component to figure out which attributes to watch, but we were using Flow at the time, so no propTypes.) Third, an optional directive configuration we never ended up using, and fourth, you can pass in Angular injectables directly into the directive, and `reactDirective` will then pass them as props to the React component. This is how we passed in our Redux store (via the `$ngRedux` service, more on that in a bit) to React from AngularJS.

Then, we can use our new directive in an AngularJS view, and pass it values that are then passed as props to React.
~~~javascript
<plan-card title="$scope.title" another-prop="$scope.someValue"></plan-card>
~~~

Hopefully, that is all relatively straightforward - there is just a bit of boilerplate to get through, but the end result is that you can have a React component being passed props from AngularJS and rendering inside of your AngularJS views!

The only "gotcha" we came across is documented in [this issue](https://github.com/ngReact/ngReact/issues/213). Basically, the casing of the property value itself that you pass into the directive determines whether it will be watched in Angular. The issue doesn't explain why, but to be safe, be sure it uses kebab-case for the attributes that you pass into your directive. So: `<my-directive this-is-good="$scope.good"></my directive>` rather than `<my-directive thisIsBad="$scope.bad"></my directive>`

Eventually, we could start using React Router inside of our large React components as more and more of the app was moved over as well. This further cut down on the need for AngularJS controllers and creating directive wrappers for each component.

## Application State: A Shared Solution

Over time, more and more of the apps we were converting were being rendered by React. The complexity of our React components grew while we took complexity away from AngularJS. Most apps need to deal with some type of application state, though. In our AngularJS apps, a lot of state was being handled in either controllers or services. Controller state was often consumed by React components, but services in AngularJS and global state, in general, needed a home during our conversion. A benefit of moving to React is that our application state could be separate from our view layer. We didn't need to keep application state in React but could find another library to handle it. There is an argument for using smaller, more focused libraries to handle different app concerns so that updating or swapping them out in the future is easier than choosing a framework that handles it all (like AngularJS itself.) We ended up choosing Redux to handle our application state.

Redux is often paired with React, but AngularJS can also read and write to a Redux store, so it was a natural fit. As we were converting AngularJS components and directives to React components, we also started lifting application state from AngularJS controllers and services up into a Redux store that was shared by the React and AngularJS parts of our app.

As we were building up our Redux store, we used the strategy of double writes for a while - having, say, an AngularJS controller write to Redux as well as utilize existing Angular services to keep track of that state in the "Angular way." This way, we could ensure that as our Redux store and actions to update it were being built, it would match up with the state that our application actually needed. So instead of creating the store and then writing/reading to it immediately, we could write to the store but not read from it in Angular initially, and use the Redux developer tools to ensure that as the app was still being updated using Angular services, etc. that the store also looked like we expected it to.

## Using ngRedux

To read and write to Redux from Angular, we used [ngRedux](https://github.com/angular-redux/ng-redux), which is a handy library that adds AngularJS bindings for Redux.

Here is an example of how we used it in an AngularJS controller. First, registering it:
~~~javascript
// import all the action creators from our Redux module
import * as FilterActions from "../modules/filterActions"

// connect the Redux action creators to $scope
const unsubscribe = $ngRedux.connect(null, FilterActions)($scope);
$scope.$on("$destroy", unsubscribe)
~~~

We are using ngRedux’s connect function to connect the Angular controller to the Redux store. The first parameter maps Redux state to a given target (the target, in this case, is `$scope`.) In this example, and in many cases during our conversion, we aren’t needing to read values from the Redux store in Angular, so we are passing in `null`. The second parameter is a map dispatch to target function. Dispatch is Redux’s way of dispatching action creators, so we are binding the ability to update the Redux store to Angular `$scope` - in this case, all the `filterActions` we imported are being bound to $scope. The connect method returns a function that we use to unsubscribe the store from changes once the controller goes away.

Then, here is where we actually call the action creator, further down in the controller:
~~~javascript
// setFilter is a function called in components based on some user action - like
// setting filtering available health insurance plans based on some value
$scope.setFilter = function(value) {
  // setByDivision is a Redux action creator, and due to the registering we did above,
  // we can call it from $scope
  $scope.setByDivision(value);
  // at the same time, also call the old filters service - double writing state
  filters.setByDivision(value;)
}
~~~
The above example is a little contrived, but it helps illustrator how we "magically" allow a Redux action creator to be accessible on `$scope`, and how a strategy of double writes may work for a time. One function updates both the Redux store as well as an existing AngularJS service (`filters`, in this case.) We can write to the Redux store but wait to read from it until we are certain what we are doing is correct.

## Implementation

I detail this in my [previous post](../evergreen-software-development-shipping-a-redesign-of-enrollment-apps-on-healthcare-dot-gov), but my team utilized feature flags to gradually roll out this conversion effort. In addition to converting the underlying technology, we were also implementing a redesign at the same time. Feature flags lend themselves quite well to gradual conversion efforts like this in general, and we could also slowly roll out our redesigned components. Feature flags gave us a lot of freedom to release partially-completed conversions, but turn them off in production. We could redo one page of a certain user flow, for example, merge it, but not worry about having to complete the entire flow.

The final step in a conversion process like this is a big one. At a certain point, we had to remove Angular entirely, hook up Redux directly to React, and figure out some type of build process that would work for our new React app. We ended up using `create-react-app` to render and build our app once our conversion was done. This whole process, completely removing AngularJS at the end, took about a sprint, so it's worth planning for the last step being a little bit bigger than the other, more gradual steps that went into this process before.