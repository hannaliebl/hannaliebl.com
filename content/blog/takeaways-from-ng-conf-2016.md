+++
blogcategories = ["JavaScript"]
blogtags = ["Angular 2", "TypeScript", "Conferences"]
date = "2016-05-10T15:34:43-07:00"
draft = false
featured = ["true"]
featured_img = "/img/ng-conf-2016-thumb.jpg"
summary = "My biggest takeaways about Angular 2 from ng-conf 2016."
title = "Takeaways from Ng-Conf 2016"

+++
I was lucky enough to attend ng-conf in Salt Lake City, Utah (thanks, [RADAR](https://www.radarfirst.com/) for the ticket!) last week. It was my first time attending a conference focused on technical topics, and I learned a lot about Angular 2, which hit [release candidate status](https://github.com/angular/angular/blob/master/CHANGELOG.md#200-rc0-2016-05-02) on the eve of the event. I came into ng-conf having never really looked at Angular 2 (though I knew, in theory, what some of its differences would be from Angular 1), and I left being really excited to learn a lot more about Angular 2 and its surrounding technologies/features.

Here are the biggest things I took away from the conference:

## I'm Sold on TypeScript
I think Google turned a lot of heads when they announced that Angular 2 would be built with [TypeScript](https://www.typescriptlang.org/), an open source Microsoft language that was described at the conference, again and again, as a "superset of JavaScript." I was skeptical, as I am of most languages that compile to JavaScript, but I was sold on how powerful TypeScript seems and the tooling support for the language. All the talks and demos I watched used TypeScript, and many people paired it with [Visual Studio Code](https://code.visualstudio.com/), Microsoft's free code editor. That alone spoke volumes: this is how the experts write Angular 2, and this is the editor they use.

TypeScript gives you both ES6 and some ES7 features while compiling down to browser-supported ES5. In addition to features from ES6 and 7, TypeScript, as the name suggests, has optional support for types as well as interfaces. Adding types to your code and interfaces to describe those types gives you a higher degree of confidence in what you write. The compiler step also helps catch errors earlier.

The tooling built into Visual Studio Code is amazing: there are built in snippets and excellent code linting available without any extra  configuration. In my limited experience with typed languages, writing (and watching people write) TypeScript reminds me of writing Go–the compiler will give you specific errors immediately that help you debug your code. Some people might not like this, but I think writing code this way makes a lot of sense, and using types, interfaces, and classes can help other developers understand very quickly how your code works.

## Angular is a Platform for More Than Just Web Apps
Angular 1 is a web framework, but I think Angular 2 has bigger ambitions. A lot of talks were focused on mobile development–by pairing Angular with [Ionic](http://ionic.io/) or using [NativeScript](https://www.nativescript.org/) to build native apps, or just building what the Angular team calls "progressive web apps" (web apps that can perform similarly to native applications) using Angular's newly-announced [mobile toolkit](https://mobile.angular.io/). The performance of Angular 2 in general was touted a lot - its ability to perform consistently at 60fps and with a lot of optimizations in terms of total framework size and initial render.

Also, the announcement of [Angular Universal](https://universal.angular.io/), the ability to precompile Angular on the server (for now, in NodeJS and .NET), means that for the first time Angular can run on servers. It means even better performance and optimization for SEO. They mentioned wanting to create partnerships with other languages and frameworks like Drupal and the PHP community. They seem to want Angular to be widely adopted and used by all kinds of organizations and developers, and have built with performance and flexibility in mind.

## Observables Are the Future
Angular 2 has support for promises, but its default http service is built on Microsoft's [RxJS](https://github.com/Reactive-Extensions/RxJS), which uses observables. Lots of talks mentioned observables–the conference made it clear that this is the optimal way of doing a lot of things that promises alone used to solve in Angular 1. To understand observables, presenters asked us to think about arrays in memory, and then extend that to consider arrays in time. Observables are basically that: arrays over time, or, to abstract more generally, events over time. And "events over time" describes almost everything - http traffic, user actions on a page, etc. Observables allow you to subscribe to those events and respond to them in your app as they happen. I'll let the RxJS README explain that better than I can:

>Because observable sequences are data streams, you can query them using standard query operators implemented by the Observable type. Thus you can filter, project, aggregate, compose and perform time-based operations on multiple events easily by using these operators. In addition, there are a number of other reactive stream specific operators that allow powerful queries to be written. Cancellation, exceptions, and synchronization are also handled gracefully by using the methods on the Observable object. – RxJS README

## ng-cli Will Make Setup a Breeze
One of the most compelling presentations demonstrated the power of the new [Angular command-line interface](https://cli.angular.io/). From my understanding, it was basically forked from Ember's CLI, and offers a lot of the same features: automatically generating a new project with the correct dependencies and folder structure, generating specific pieces of your app automatically, generating unit and end to end tests, serving for local development, and deploying. I think more support for getting people up and running quickly is a good thing, and this encourages a proper setup and organization for everyone from the start. I do think at times Angular 1 suffers from too many ways to do a single thing: for example, you could organize your folders in a project in different ways and there always seemed to be changing opinions about how to do that. An official command line tool removes all questions and gets people into being productive quickly.

## ng-animate and Angular Material Look Amazing
ng-animate is getting completely rewritten as well, and the demo for this looked fantastic. Animations will be programatic–you declare each render step–which gives you complete control. You can query specific DOM elements or group them and apply animations to them, and there is built in support for staggering animations. All in all there seems to be a lot more control and focus on performance. One of the best little features was solving the problem of calculating the height of divs that expand and contract, like in an accordion, for example. The new ng-animate allows you to pass in a * (so something like `height: '*'`), and it automatically computes the height of the element for you.

The conference also put a lot of focus on the integrations available with [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) patterns–they are working on making components and styles to work with Angular 2 (there is an existing [Angular 1 library](https://material.angularjs.org/latest/) as well). The Angular Material team demoed just how fast it is to make an app using a beautiful, consistent UX language. They are building a high-quality library of common UX components that will work seamlessly with Angular 2: menus, forms, datepickers, etc.

## Evergreen Angular
One of the most interesting but as-of-yet not detailed features of Angular 2 will be, eventually, the ability to keep Angular itself always-updated. They mentioned briefly that they do this internally with Angular apps at Google, and want to make this possible for the entire community. I don't know how this would look, but the idea is interesting enough to mention and keep an eye on.

## They're Not Quite There Yet
A running joke of the conference was people asking each other in jest, "Sooo...when is Angular 2 going to be released?" At more than one talk presenters said things along the lines of, "Oh, we just submitted a PR for that last night." A lot of the things I wrote about here are not out of alpha or not merged into Angular yet. That's a good thing, though, because it means you can get in on the ground floor with both learning and potentially helping to develop these new features and tools.

The conference introduced me to core concepts about how Angular 2 works and got me really excited to dig into learning as much as I can about it. It's an exciting time to be a front end developer! If reading this got you excited to learn more, check out the [talks](https://www.youtube.com/playlist?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j) that were recorded from the conference and try out Angular 2 and TypeScript by doing the [Tour of Heroes demo](https://angular.io/docs/ts/latest/tutorial/).
