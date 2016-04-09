+++
blogcategories = ["Site Announcements"]
date = "2016-04-09T12:04:58-08:00"
draft = false
featured = ["true"]
featured_img = "/img/hugo-thumbnail.jpeg"
blogtags = ["Hugo", "Static Sites"]
title = "Welcome to My New Hugo-Powered Site"
summary = "Read about my new site, running on Hugo, a Golang-based static site generator."

+++
A somewhat [recent trend](https://www.google.com/trends/explore#q=static%20site%20generator) in web development has been the rise of statically-generated sites: sites without a backend, but with the benefits of templates, partials, and a lot of the blogging features that we are used to having with a full content management system: categories, tags, pagination, sorting, drafts, and so on. I decided to get in on the trend with this site, made in [Hugo](https://gohugo.io/), the Golang-based site generator.

## Why the Change: Simplicity and Control

I ran this site with Wordpress for years, and I still think content management systems have their place, but it was becoming increasingly difficult for me to update the site's design and organization. To test new changes to a Wordpress site, you have to run it with a local database and mess around with PHP templates. With Hugo, though, it's as simple as running one command, adding whatever metadata you need to your files to help with site organization, and organizing your content into folders.

Static sites are also more secure–there's no user login, no database to corrupt. They can be more performant, again, because no database is needed. They remind me of the best parts of the "old days" of the internet, when anyone could easily make a site on Geocities or Angelfire (without the marquee tags, thankfully.) There's more room to experiment–just throw up a folder with an index.html and try something out; there's no need to wrestle with the CMS and the way it chooses to organize and render pages. At the same time, you have the option to use the power and flexibility of partial files, templates, and organizational metadata.

My hosting was also costing me too much. For Wordpress, you need hosting that includes a database and support for server-side languages, but with static sites, all you need is a place that can host files and serve them. Amazon S3, for example, is way more affordable for the traffic my site gets than full-blown database hosting.

## Design Changes

I used the switch from Wordpress to Hugo as an opportunity to redesign the site as well. The biggest change I made is constraining the page width in the interest of both simplicity and legibility. I didn't want to deal with a bunch of site layouts for different screen sizes. The design is mobile-first, and then expands up to 850pixels. Text content generally is even more constrained, so the shorter line-length promotes a good reading experience. A large site width for the content I have–some text and some small images–seemed like overkill. The styles are simple to maintain and I think the design is also concise and simple in a good way.

I rewrote all the CSS for the site, too. Again, in the interest of simplicity, I chose not to use a framework like Bootstrap (though I did borrow some things they do well, like helper classes and a row/column system.) I tried to use more color in this design as well, though I kept the old mint green as the primary color. I used SASS to generate the CSS, and tried to organize it intelligently, using variables and mixins.

## Hugo's Strengths

The biggest strength Hugo has over other static site generators is speed. Go is a fast language, and it shows in its compile time. Hugo watches the files as you change them, and the compile time is so fast I don't even notice the site updating as I tab from my text editor to the browser. There are also no dependency requirements for Hugo. You don't even need Go; all you need is the Hugo binary.

Finally, Hugo's docs and support are (generally) excellent. I received a response quickly on the Hugo forums and found a lot of good examples in the docs and forums to answer most questions I had. Hugo is also under active development, which is good to see in a large open source project–they are always looking for improvements and releasing them.

## Problems Along the Way

The main problem I had was wanting section-based tags and categories. My ideal organization for a blog and portfolio site is to have the following behavior: if I write a blog post about AngularJS, I want to tag it with 'AngularJS.' However, if I make an application using AngularJS and include it in my portfolio section, I also want to tag it with 'AngularJS,' but I don't want to have a single view for all 'AngularJS' tags on my site. I want a URL that looks like 'work/tags/angularjs' and another one that looks like 'blog/tags/angularjs', and separate views to go along with them. As best I could tell, this is impossible to do in Hugo. I settled for including 'blogtag' and 'worktag' to separate my content out, which makes for a slightly weird url, but gives me the ability to design two different views for Blog and Work archives.

There were a couple other quirks with Hugo as well. One example was date formatting–you can format a date in Hugo by providing an example date, but that date needs to be January 2, 2006. For example: `{{ .Date.Format "Jan. 2, 2006" }}` or `{{ .Date.Format "01-02-2006" }}` This is because Hugo uses Go's [time package](https://golang.org/pkg/time/#pkg-constants) and that's the way it is done there, but I found this in the help forum, not explicitly stated in the docs.

Hugo doesn't include any built in support for CSS preprocessors like LESS and SASS or any minification/processing of other assets, like a JavaScript-based static site generator might. This isn't actually a real problem, just a design choice that some people might not like. In some ways I prefer to have control over this myself, and I wrote a simple Gulp file to compile the SCSS I had written. Future versions of Hugo might include support for asset generation, which is something to keep an eye on.

## Things I Left Behind

I transferred everything from my old site over by hand, mainly because I wanted to redo the organization system for the blog, and I wanted to edit the text content of old posts anyways. The biggest thing I'm missing are my old Wordpress comments; some posts had a fair number of them. I looked into importing Wordpress comments into Disqus, but in the end, it didn't seem worth the hassle.

I also cut back on some portfolio pieces and got rid of my old contact page. Overall, I was going for simplicity–in design, content, and organization. I hope you like it!
