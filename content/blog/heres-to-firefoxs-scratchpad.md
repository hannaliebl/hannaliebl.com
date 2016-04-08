+++
blogcategories = ["JavaScript"]
date = "2014-06-27T10:00:00-08:00"
draft = false
featured = ["false"]
blogtags = ["Firefox", "Resources", "Learning to Code"]
title = "Here's to Firefox's Scratchpad"
summary = "The scratchpad in Firefox makes learning JavaScript a joy."
+++
I’ll be honest, I mostly use Chrome for web development. This is partially because my current job calls for developing things that only use webkit and Chrome (I know this sounds odd…it is pretty unusual), but, regardless, Firefox is also a fine browser, if not the current golden child. Maybe this is old news for people who develop with Firefox, but the Scratchpad on Firefox is, in my opinion, noteworthy enough to warrant its own post.

Firefox’s Scratchpad is basically a small text editor linked closely with the Firefox console. That doesn’t sound very cool at face value, but, consider:

I’m a developer trying to improve my JavaScript chops or experimenting with some idea I want to execute in JavaScript. I could open the Chrome console and use command-shift to make a newline break in my multiple-line function and then call it from the current console session. I could open Sublime Text or whatever other text editor I like, save my file, link to my JavaScript inside a dummy index.html page, and then use the console of that page to play around with the JavaScript (or write it using `<script>` tags inline). I could perhaps use a [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) from inside a Sublime Text package or perhaps one within Node…but, the point is, all of these solutions have some tedious or inefficient work involved.

How about this:

1. Open Firefox.
2. Click on Tools > Web Developer > Scratchpad
3. Write your JavaScript.
4. Open the Firefox JavaScript console (Tools > Web Developer > Web Console).
5. Select with your cursor only what you want the browser to evaluate.
6. Hit command-R to run the function in the browser, or hit command-L to display the function’s output (so, not side effects of the function).

Ok, that’s 6 steps, but 6 easy steps! The Scratchpad also offers syntax highlighting, a button to format your JavaScript using prettyprint, and the option to save what you’ve written. This is all within a browser! There is no other tool I know of that makes the connection between written JavaScript and the browser more apparent than the scratchpad.

<div class="text-center inline-image-container content-container-expanded">
  <img src="/img/scratchpad-screenshot.png" alt="A screenshot demonstrating the Firefox Scratchpad." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The Firefox Scratchpad in action.</div>
  </div>
</div>

It’s also truly a scratchpad: you can selectively run what you  write using simple text selection, meaning you can easily iterate over a given idea or function without having to continually comment out your code. If you hit Command-L to display your results in the Scratchpad itself, you can easily see errors displayed and work through them there.

Perhaps there’s some Chrome extension that does something similar, but for now, I find the Firefox Scratchpad the best place for writing vanilla JavaScript and experimenting with new ideas.
