+++
date = "2013-08-06T22:28:15-08:00"
draft = false
title = "Setting Up Syntax Highlighting for SASS in Sublime Text"
categories = ["Web Development"]
tags = ["Guide", "SASS", "Sublime Text"]
featured = ["false"]
summary = "A guide to getting SASS syntax highlighting to work in Sublime Text."
+++
**UPDATE (4/13/15):** A commenter pointed out that, indeed, there are separate plugins for SCSS syntax highlighting/auto completion and SASS highlighting/auto completion, so, install the one that is best for you. If you use full-on SASS (so no curly braces, .sass files) then use the SASS one, if you write to .scss files, use the SCSS one. By the way, [this is a good post](http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better) about the differences between SASS and SCSS.

Recently, I’ve been using [SASS](http://sass-lang.com/) (the great acronym stands for Syntactically Awesome Stylesheets) for projects. SASS is awesome. It’s powerful and has changed the way I think about writing and organizing CSS. It adds functionality like variables, nesting, and mixins to writing CSS. It’s a preprocessor; basically, you write in SASS, using its logical structures and easy syntax, and then it outputs to plain old CSS. It also integrates with [Compass](http://compass-style.org/), a powerful CSS framework which I have just barely scratched the surface of.

Anyways, I also use the text editor Sublime Text, which doesn’t come with native support for SASS syntax highlighting (specifically, .scss files, which is what I write in). Trying to write code without syntax highlighting is a little like trying to study paintings by looking in black and white museum guides. It’s a huge help when writing code and often helps point out silly mistakes before they happen. I just upgraded to Sublime Text 3 and had to go through the process of adding syntax highlighting again for SASS and thought I’d write up a little guide, since I had forgotten how to do it since I added it to Sublime Text 2.

<div class="text-center inline-image-container">
  <img src="/img/no-sass-syntax-higlighting.png" alt="A SCSS file without syntax highlighting" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Some SCSS without syntax higlighting.</div>
  </div>
</div>

Alright, first, you need [Sublime Text Package Control](http://wbond.net/sublime_packages/package_control). This handles packages others write for Sublime Text, and integrates directly with Github. The [installation page](http://wbond.net/sublime_packages/package_control/installation) has good directions, but make sure to read the note for Sublime Text 3 if that’s what you’re using: the only way to install is through Git. You basically just clone the repo into your Sublime Text Packages folder.

Next you actually have to add the SASS bundle. Open your packages control by hitting command-shift-P (Mac). Type “install” and then click on Package Control: Install Package. You will get another prompt, search for SASS. The package I use is [here](https://github.com/nathos/sass-textmate-bundle), and should be the first package that is listed after you search for SASS. Just click on the package name and it will install.

<div class="text-center inline-image-container">
  <img src="/img/sublime-package-control.png" alt="Searching for 'sass' in Sublime Text's package control" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Search for the SASS package in Sublime Text package control.</div>
  </div>
</div>

You’re not done yet, though, you actually have to turn on SASS syntax highlighting. Again, hit command-shift-P (Mac), search for SASS, and select Set Syntax: SASS.

<div class="text-center inline-image-container">
  <img src="/img/set-syntax-sublime.png" alt="Setting syntax highlighing to SASS" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Turn on SASS syntax highlighting.</div>
  </div>
</div>

And there you go! Your ugly monochrome .scss files should now be colored, beautiful, and functional and you can get on with the real fun of writing CSS. If you don’t see any changes, restart Sublime Text.

<div class="text-center inline-image-container">
  <img src="/img/sublime-text-with-sass-syntax-highlighting.png" alt="A SCSS file with syntax highlighting working" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Much better – SCSS/SASS syntax highlighting should now appear.</div>
  </div>
</div>
