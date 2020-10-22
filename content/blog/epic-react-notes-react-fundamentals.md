+++
date = "2020-10-21T01:20:13-05:00"
draft = false
title = "Epic React Notes: React Fundamentals"
blogcategories = ["JavaScript"]
blogtags = ["React", "Learn in Public"]
featured = ["true"]
featured_img = "/img/epic-react-thumbnail.png"
summary = "My notes from the first workshop in Epic React, React Fundamentals, mostly covering things I learned about JSX"
+++

I'm taking Kent Dodd's [Epic React](https://epicreact.dev/) course, and I thought in an effort to revive this blog, I'd share my notes as I go through it. For this workshop, I'm not summarizing everything that he teaches, but rather writing up notes on the parts where I learned something. I also appreciated that Kent encourages people who take the course to write what they learn from it as a way of reinforcing their own knowledge, so this is also part of that process for me. I'm trying to [learn in public](https://www.swyx.io/learn-in-public/)!

I'm mostly taking this course because I think [Kent Dodds](https://kentcdodds.com/) is a great teacher and "thought leader" in the React/modern JS world and because I wanted a solid introduction to the more recent parts of React that I don't use as much (we are still mostly in class-land for work, though we are looking to change that coming up soon.) Also, I have a nice continuing education budget, thanks, [Ad Hoc](https://adhoc.team/)!

I knew parts of the course would be review for me, but I decided to just start at the beginning, because I tend to do well with "traditional" video lectures, and hearing Kent talk about even basic things is a good way to reinforce and strengthen what I already know.

## Destructuring

The beginning of the course was some prep work, including reading Kent's blog post [JavaScript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react), which is a nice, concise summary of modern JavaScript with examples in React and not in React. In the destructuring section, he encouraged reading the [MDN docs on destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), which I did, and I learned something new:

You can ignore return values from destructuring!

```javascript
function returnLotsOfAnimals() {
  return ["cat", "penguin", "rabbit", "bear"];
}

const [myFavorite, , , mySecondFavorite] = returnLotsOfAnimals();
console.log(animalA, animalB); // "cat" "bear"
```

There's also a neat little exercise in Kent's blog post that has you practice destructuring ([it's at the bottom of this section](https://kentcdodds.com/blog/javascript-to-know-for-react#destructuring)), and here is my solution:

```javascript
const {
  title,
  protagonist: {
    name: protagonistName,
    enemies: [, , , { title: enemyTitle, name: enemyName }],
  },
} = info;
```

## JSX Under the Hood

Kent hammered on the point that JSX really is just syntactic sugar for `React.createElement`, and said that when you look at JSX you should understand that every set of `< />`s will end up being translated into those individual `React.createElement` calls. This is important because it informs why you can't use statements inside of the curly braces in JSX. The curly braces are where values get interpolated as JavaScript and passed as arguments to `React.createElement`, and you can't pass statements as arguments to function calls. You can, however, use expressions inside of those curly braces. Expressions are things that evaluate to a value in JavaScript.

So this works:

```jsx
// Contrived example, but a function call is an expression
function returnWords() {
  return "Hello, world!";
}
// JSX:
<div className="container">{returnWords()}</div>;

// Compiles to:
React.createElement(
  "div",
  {
    className: "container",
  },
  returnWords()
);
```

But this doesn't:

```jsx
// JSX:
const areYouLeaving = true;
<div className="container">{if (areYouLeaving) {return "Bye!"}}</div>;

// TRIES to compile to:
React.createElement(
  "div",
  {
    className: "container",
  },
  if (areYouLeaving) {return "Bye!"} // you can't pass this as a function argument!
);
```

This is why ternaries are so common in JSX, by the way. Ternaries are expressions, so using them is how you can get some of that if/else logic inside of JSX. This is something I "knew," but never really thought about the reason why.

```jsx
// JSX:
const areYouLeaving = true;
<div className="container">{areYouLeaving ? "Bye" : "Hello"}</div>;

// Compiles to:
React.createElement(
  "div",
  {
    className: "container",
  },
  areYouLeaving ? "Bye" : "Hello"
);
```

It's interesting to poke around the [Babel Repl](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=usage&spec=false&loose=false&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiGAewDsAXBMYrAJzwD4AJLOOQgGigHdDq4QBCYAHpwEOgCggA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=true&targets=&version=7.11.6&externalPlugins=) to see how JSX works under the hood in action.

The other neat thing I learned about `React.createElement` is that its first argument is `type`, and that can be something like `div` or `h1`, but it can also take a function (or a class!), and that is the basis of creating custom components. JSX is set up so that when you title case something inside of `< />`s, it looks for a value of the same name in scope and passes that as the first argument to `React.createElement`. This is why you can only have one root element for a given component (and why `React.Fragment` exists), because you can't pass two values as the first argument to `React.createElement`. Again: I "knew" this, but not the details of why/how it worked under the hood.

## Extras

A few other snippets of things I found interesting/learned about:

Adding the `for` attribute to a label for an input, while not only important for screen readers, also makes it so that the input receives focus when the label is clicked.

I had never seen or heard of `console.dir` before, but Kent used it at one point. There are a [whole bunch of methods](https://console.spec.whatwg.org/) on `console` I didn't know about.

He also mentioned ["Pit of Success"](https://medium.com/@ricomariani/the-pit-of-success-cfefc6cb64c8) at one point which I Googled (see a [post on Coding Horror](https://blog.codinghorror.com/falling-into-the-pit-of-success/) about it), and it's a neat concept. Kent was talking about a user experience issue, guiding users into a "pit of success," but it can be used for developers of all types when developing APIs and language features as well.