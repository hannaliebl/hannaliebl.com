+++
blogcategories = ["JavaScript"]
date = "2014-05-07T18:34:02-08:00"
draft = false
featured = ["false"]
blogtags = ["Angular 1"]
title = "Formatting JavaScript's Date in AngularJS Outside of the View"
summary = "Using Angular's $filter service to format dates."
+++
Oftentimes, especially in API calls, dates and times need to be entered into the call in a specific way. JavaScript offers the handy Date(); object, which makes it easy to call the current time or create and store a date in the past or future, but formatting the result into a custom format (such as `mm/dd/yy` or `yyy/mm/dd/hh/mm/ss`) is not possible, as best I could tell, in vanilla JavaScript.

Luckily, the app I was building ran on AngularJS, and so I could leverage Angular’s handy built in filters, specifically, the date filter. Because the API call was being handled in a service, though, I didn’t implement the date filter in the way you do in the view in Angular, which is the more common way (to write, say `{{myDate | date: 'yy/mm/dd'}}` in the HTML view itself.)

First, I set a variable with the plain old unformatted JavaScript date. If you want the present time, just use:

~~~javascript
var myTimeUnformatted = new Date();
~~~


But if you need, say, last week’s date, then do:

~~~javascript
var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 7));
~~~

This will return a date in this format: `Wed Apr 30 2014 16:33:22 GMT-0700 (PDT)`

Now, to convert this date into whatever format we need (inside an Angular app!), enter $filter. First, because we are not working in the view, but in a service or controller or other part of the app, you have to inject $filter into wherever you are calling it, much like you inject other Angular services like $http or $scope. In this case, I was calling $filter in a custom service, so you just enter it where you do other injections, for example:

~~~javascript
angular.module('myApp')
  .factory('myService', function ($filter, $http) { ...etc, etc
~~~

Now, it’s as simple as following the way the date filter$ is documented in the API:

~~~javascript
var lastWeek = $filter('date')(lastWeekUnformatted, 'yyyy-MM-dd');
~~~

Of course, here is where you can customize the output as you please, using the API doc linked to above. The example above would output: `2014-04-30`

And it’s as easy as that to get a date into an exact format required by an API or anything else in your application.
