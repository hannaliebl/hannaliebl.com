+++
blogcategories = ["HTML"]
blogtags = ["Semantics", "Browser inconsistencies"]
date = "2017-03-04T10:36:47-08:00"
draft = false
featured = ["true"]
featured_img = "/img/w3c-button.png"
summary = "I solve a 'bug' and discover how Chrome treats buttons a little differently than Safari and Firefox."
title = "The Curious Case of Chrome Buttons"

+++
This is a brief post about a "bug" I found in Firefox and Safari. Actually, turns out Firefox and Safari (only tested in versions 51.0.1 and 10.0.3, respectively) implement this particular rule correctly, so it's really a bug or strange implementation in Chrome that is to blame.

The situation is as follows: I'm adding a dropdown to a button in a toolbar for [textAngular](https://github.com/fraywing/textAngular) (just adding some functionality to what already exists, normal stuff.) The details don't really matter that much, but I basically made an unordered list a child of a button element and strung it together with [UI-Bootstrap's](https://github.com/angular-ui/bootstrap) lovely Angular 1.x directives to make the unordered list appear on click. TextAngular uses button tags in its toolbar, so I was adding another one using the existing markup as a guide. Unfortunately, I was blithely ignorning what can and cannot go inside of a button element.

My dropdown worked...in Chrome, perfectly. In Firefox and Safari, though, the dropdown came down, but you couldn't actually click on anything inside of it. It was as if it didn't exist from the browser's perspective. My cursor would just highlight elements behind the dropdown.

I did a bunch of googling and fiddling about with CSS: positioning, z-index, etc...but that was all a false trail. I ended up comparing this particular button dropdown with other dropdpwns in our app, where we use a div as the parent element. That was the only difference...and that was the "bug"!

The rule is that according to [W3C recommendations](https://www.w3.org/TR/html5/forms.html#the-button-element), a button element can only have phrasing content as its child. Specifically, the content model for a button element in the HTML5 spec is: "Phrasing content, but there must be no interactive content descendant." Phrasing content are text nodes and some tags you would expect to see inside a paragraph...`<em>, <strong>, <img>` are some common examples. Anchor tags ARE phrasing content, but they are interactive content so they aren't allowed inside buttons.

So in Firefox and Safari, all the javascript worked to make the list appear, but functionally it was as if this unordered list didn't exist. I couldn't click on it or interact with it at all (though it was in the DOM.) Weird. But, sorta makes sense if you read the rule. Turns out Chrome does it, technically, incorrectly, or at least is a little more forgiving with bad HTML.

Just for fun I made some a [codepen](http://codepen.io/hannaliebl/pen/EWKqoZ) to see how each browser would handle having non-phrasing content inside a button. In Chrome you can click on both links inside of buttons and it will work, but in Firefox you can see the links but you can't interact with it at all. Curious! But, it makes sense if you know the rules.

If I had run the code through and HTML validator, I would have found this out right away. The issue is Chrome allows you to do this, and obscures a semantic bug, basically.
