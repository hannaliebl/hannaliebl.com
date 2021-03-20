+++
blogcategories = ["JavaScript"]
blogtags = ["React"]
date = "2018-02-04T21:07:13-07:00"
draft = false
featured = ["true"]
summary = "Some lessons I've learned as I've learned to use React - both important concepts about React itself but also strategies for learning the library."
title = "First React Lessons"
featured_img = "/img/react-first-lessons.jpg"

+++

A lot has changed since I wrote in my blog! I got a [new job](https://adhocteam.us/) and moved across the country. I went from doing Angular all day to working with React. I spent evenings in the spring of 2017 learning React, and now I do it professionally. Here are some lessons I learned about React and _learning_ React along the way. This article is not a "React 101", so I'm not going to explain everything from square one, but hopefully the concepts can be useful to you if you are learning React.

To actually learn React, I read through the [docs](https://facebook.github.io/react/docs/hello-world.html) (I think React has some of the best docs in the business, and they are worth reading in their entirety) and finished some video tutorials: [Andrew Van Slaar's React course](https://egghead.io/courses/build-your-first-production-quality-react-app) on Egghead.io and [Stephen Grider's React with Redux course](https://www.udemy.com/react-redux/) on Udemy. In addition to the apps they had you build in those tutorials, I made my own little app, [fitnesscalculations.com](http://fitnesscalculations.com).

## Tooling

There's this wonderful project by Facebook called [create-react-app](https://github.com/facebookincubator/create-react-app) that gives you all the tooling needed to get a React app up and running. React thrives on ES6, and create-react-app gives you ES6 and even some ES7 features (with linting) and bundles everything up into a production-ready build. It also allows you to use JSX, basically allowing you to freely mix JavaScript and HTML while building your UI components. This seems odd at first, but it's very useful and means most of what you write is "just Javascript"–there are no specialized directives to learn like in Angular to do things like conditionally show pieces of the UI or loop over data to generate a list.

When learning new things, I try to focus on one thing at a time, and although I'm familiar with webpack and other modern JS build tools, create-react-app allowed me to focus on just building an app and not worry about the surrounding tech and complications they introduce. I'd encourage anyone who wants to start learning React to just use create-react-app, because it allows you to focus on writing JavaScript and not writing configuration.

## State Management and Data Flow

Again, in the interest of learning one thing at a time, and on the advice of other articles, I decided to forgo using Redux or another state management library at first to understand how React manages state. Basically, React uses unidirectional data flow. Parent components pass state down into their children (as props). The only way children can communicate changes back up is through callback functions that update the state via a special method called `setState`, which is the only way React component state should be updated.

An important thing to keep in mind is that `setState` is asynchronous: when you update a specific piece of state, you can't turn around and then update another piece of state using the newly-updated value and be ensured that the state you thought had updated is updated when you need it to be.

That's a bit tough to type out and understand, so let me give you a concrete example. In my fitness calculations app I allow users to enter their height in inches, but then I use that inches value to update a masterHeight state value in centimeters. Initially I tried to do something like this:

```javascript
handleInchesChange = (event) => {
  this.setState({
    inches: event.target.value,
    masterHeight: UnitConversion.imperialToCm(this.state.inches),
  });
};
```

The `UnitConversion.imperialToCm` is just a utility that I define myself to convert inches to centimeters, and doesn't really matter. What matters is that `this.state.inches` is not necessarily going to be what I expect. State changes are asynchronous, and you can't depend on state being updated properly within a `setState` call. Luckily React allows you to pass a callback function to `setState`, and in that case state changes are properly updated as you expect them to be. The correct way to write this is:

```javascript
handleInchesChange = (event) => {
  this.setState({ inches: event.target.value }, function afterInchesChange() {
    this.setState({
      masterHeight: UnitConversion.imperialToCm(this.state.inches),
    });
  });
};
```

There are other nuances and complications with React state. State is immutable in React! This is a key concept. When dealing with more complicated state, like, say, an array or objects, which are pass by copy of reference, you always want to make a copy of the array or object to update it. This is a breeze with ES6's `Object.assign` or the spread operator. Create-react-app even gives you the ability to use an object spread operator. The [Redux docs actually describe how to do this](https://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html) much better than I can, and it's useful not only for Redux but for React's own state management as well, and definitely worth a read.

In general, avoiding overly-complicated, nested state is something I find myself trying to do when designing React apps, and is a useful exercise in general to make apps that are easy to reason about. How to encapsulate state successfully and the interaction of state and components is at the heart of any React and front end project, and the way React handles state makes those type of decisions very important (as they should be, in my opinion.)

## Component Types

Speaking of the intersection between state and UI components, React has two types of components: class components and functional components. A functional components is just a JavaScript function that takes props as its arguments and returns some HTML. Functional components can be thought of as pure UI components: they don't deal with any internal state. They can accept state from parent components via props, though, and communicate any changes back up via a callback function that gets defined wherever the state originated.

Class components use ES6 classes and have a constructor that instantiates its own state. State is contained to the component in which it originated, and can only be passed down to child components via props.

A strategy for designing a React app is to make every component functional until you realize it needs to have its own state - then switch it to a class component.

## Forms

I think forms are essential parts of many UI applications and provide a reasonable amount of complexity since you deal with user input and generally with validating that input, so learning how to use them in React early on was an important goal of mine. Unlike Angular, there is no extensive support around forms in React. You do everything by hand - validation, handling input, etc. This gives you a lot of control but can be a little intimidating if you are used to a framework's support.

The most important concept with using forms in React is the concept of a [controlled component](https://reactjs.org/docs/forms.html#controlled-components). A controlled component means its value is set via state, not by user input. That sounds wrong, right? But React depends on this downward data flow. The state should tell the input what to do and should be the single source of truth for the value of an input. This is done simply by setting the `value` attribute on an input to a field on state. Then, a callback function hooks into the `onChange` event for that input and updates the state view `setState`, and as state is what is bound to `value`, the UI updates to reflect the user's change.

All a user typing into a field really does is trigger a callback function. That function calls `setState` which triggers a re-render of the component (and all child components) and the value of the input now reflects the newly-updated state. The input REACTS (ta da!) to the change, but it goes about making that change in a very set way. All user input is passed through a defined route, which makes validation and other updates that need to happen after user input easy to add.

## ES6 (And Beyond)

Honestly, a lot of understanding how to use React effectively (and to follow the wealth of tutorials and blog posts about it) is knowing how to use ES6. Arrow functions, reducers, spread operator, modules, etc. are all small concepts on their own but are used everywhere in React examples you will find. Once you get used to the syntax, I really believe using ES6 makes developing JavaScript more effective and concise.
