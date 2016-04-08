+++
blogcategories = ["Guide"]
date = "2014-04-01T18:33:31-08:00"
draft = false
featured = ["true"]
img_credit = "Photo: wocintechchat.com"
blogtags = ["Front End Development", "Learning to Code"]
featured_img = "/img/how-to-get-front-end-dev-job-thumb.jpg"
title = "How to Get a Job as a Front End Developer"
summary = "The story of how I became a developer, and what I think is important for others trying to break into the field."

+++
I have had a couple people ask me recently about how to do a career change into web design and development since I recently switched over from doing some freelance work on the side to a full time job as a junior front end developer. After giving out advice in rambling emails and Gchat messages, I thought it might be better to organize and condense my thoughts down into a hopefully helpful blog post.

First, there is always confusion on job titles. A front end developer can mean different things to different people and companies. At one company a front end developer can be a very technical role, working heavily with client side JavaScript frameworks and doing very little design and thinking about user experience, whereas at another company all you need to know is some basic jQuery DOM manipulation and you will be expected to do a lot of the styling and user experience work and planning.

Second, this post is biased by my own experience, which may be very different than yours. For some context, here’s my story so far: I started out doing web design circa 2004 as a high schooler on Geocities, making some very rad table-based websites. I stopped during college, then came back to the web world around 2011, and a lot had changed. Css3 and HTML5 were just hitting the scene, and I had a lot of catching up to do. So I read a lot and practiced and got into WordPress development. Last year I started thinking seriously about moving from what I consider web design – the look and feel and interactions on a website – to what I consider web development – using programming languages on the client and server side to build interactive sites and web applications. I read and learned a lot about JavaScript, including frameworks like Angular, and have begun delving into Ruby on Rails. I moved from Iowa to Portland, Oregon last fall and landed a job as a Jr. Front End Developer at a social media company. My day-to-day work includes a lot of the more designer-oriented development side of things: CSS and HTML style changes and UX planning and prototyping, but I also do some solid JavaScript work and bug fixes using AngularJS, jQuery, and vanilla JavaScript.

That’s my background, and so my advice will skew towards a skill set more in the middle of the technical and design spectrum: good advice for someone wanting to get into a web designer or interaction designer role, but it should also be useful for anyone wanting to land a jr. position as a front end developer at smaller shop where you will, perhaps, be expected to think about and take on a more diverse set of skills. So, without further ado…

## To be a front end developer you absolutely need to know:

1. HTML! It’s the markup language that defines the structure of any website, so you had best know it very well.

2. CSS, the styles that define how a website looks. At first glimpse CSS and HTML appear straightforward and simple, but they are their own complicated beasts, especially in today’s world of more widespread browser support for the newest and greatest CSS3 modules and HTML5 tags. Definitely know at least a little bit about responsive design and cross browser compatibility and quirks. As a bare minimum for CSS, I’d say you should understand the box model, positioning, and floats. I learned the basics so long ago that I don’t even remember where I started, but current resources I’ve heard good things about include the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web) and [Codecademy](http://www.codecademy.com/tracks/web).

3. The basics of JavaScript syntax and usage. Almost every front end developer will be asked to do some work with jQuery, a widely-used JavaScript library, whether it’s just adding an existing plugin to a site or writing one from scratch. Know at least how to read through a JavaScript program and understand what it does. Know how to write basic JavaScript (or more realistically, jQuery) to manipulate the DOM (document object model). Ideally you would know about basic control structure in JavaScript as well, and how to make AJAX calls. I learned/am learning JavaScript through a variety of sources. Again, [Codecademy](http://www.codecademy.com/tracks/javascript) is a great place to get a feel for the syntax, but I have also paid for a monthly pass to and highly recommend [codeschool.com](http://www.codeschool.com/). I have also used or heard good things about the following: [“How to Learn JavaScript Properly”](http://javascriptissexy.com/how-to-learn-javascript-properly/), [Try jQuery](http://try.jquery.com/), [Eloquent JavaScript](http://eloquentjavascript.net/), and [DOM Enlightenment](http://www.domenlightenment.com/).

4. How to use your browser of choice’s inspection tools. All major browsers now (even Internet Explorer!) come with inspection tools to look at webpages: their HTML structure, their CSS styles, and a JavaScript console upon which you can access client side JavaScript and read error logs. Additionally, you can look at the network requests as they come into, measure site performance, and do a lot of other useful things, just by looking at the inspection window as you load a page. Make it a habit to study other websites you admire through the inspector to learn how other developers build things. Front end developers are in a unique position where anyone with inspection tools can go out and look at anyone else’s work, so take advantage of that. I have not used this personally, but it’s sponsored by Google and produced by Codeschool, so it is likely good: [Intro to Chrome Dev Tools](http://discover-devtools.codeschool.com/).

5. The basics of a Unix-style command line. If you use Windows, that’s fine, there are command line tools out there for you, but most developers I’ve come across all use OS X or a flavor of Linux and do a lot of work from the command line. You should know how to navigate the file structure of your computer using the command line, how a Unix system is organized, and how to do basic things like install things and create and delete directories from the command line. There are very useful tools like [Homebrew](http://brew.sh/) for OS X and [Grunt](http://gruntjs.com/) that run from the command line and are worth looking into. If you get into more languages (like Ruby) or server administration, knowing how to use the command line is essential. Start using it now; it will save you time and you’ll understand better how things work.

6. How to host a website locally. At the very least, know how to use a basic Apache and MySQL server ([MAMP](http://www.mamp.info/en/) is my go-to recommendation). It will make working with more complicated sites easy and is essential for local development of sites that depend upon a database, like any WordPress site.

7. How to use a text editor designed to write code and markup. It doesn’t really matter what you choose; [Sublime Text](http://www.sublimetext.com/) is very trendy right now and is what I use, but do some research and choose one that seems to fit your needs. In any case, know how to use it to write code and markup successfully. Know how to use syntax highlighting and autocompletion for the languages you use. Know how to make your life easier with your text editor. In Sublime Text, for example, I use the multiple cursors feature, find and replace tools, search tools, and package manager to install other extensions all the time, and all of these features make me more productive and help me write better code.

8. How to change and learn new things–how to adapt. The technology world changes quickly. There’s always a new framework, a new technique, a new style, etc. to learn. Try to stay abreast of these changes at least a little bit, and it will serve you well. There are a myriad of resources out there that will help you stay up to date. My favorites are [A List Apart](http://alistapart.com/), [Smashing Magazine](http://www.smashingmagazine.com/), and [CSS Tricks](http://css-tricks.com/). Simply Googling a question or problem is also a good bet, and searching [StackOverflow](http://stackoverflow.com/) for specific coding problems is usually fruitful. I also always try to follow respected designers and developers on Twitter, which can be a great source for articles and news ([here is my design/web design/webdev Twitter list](https://twitter.com/lieblhan/lists/web)). I also think there is some benefit in keeping up with social sites like Reddit (there are many subreddits that are relevant, [r/webdev](http://www.reddit.com/r/webdev) and [r/frontend](http://www.reddit.com/r/frontend) are good places to start, but most languages/frameworks have their own community) and [Hacker News](https://news.ycombinator.com/). They will talk about issues relating to the technology world as a whole, and keep you in the loop with what’s going on in general. Every industry is a little microcosm of its own, and you should be at least somewhat invested in learning the culture and news of your given microcosm.

## Extra things that will make you a more competitive applicant:

9. Knowing how to use Git and [Github](http://www.github.com/). Git is a version control system; do some reading and start using it on your own projects. Set up a Github account and put open source sites and projects on it. Use Github to look at other people’s code, and, ideally, start contributing to open source projects on Github. I used [this online book](http://git-scm.com/book) to learn the basics of Git.

10. Knowing a CSS preprocessor like [SASS](http://sass-lang.com/) or [LESS](http://lesscss.org/). I prefer SASS, and in my limited sampling of looking at job postings, SASS seemed to be listed more frequently than LESS.

11. Experience with existing front end design frameworks like [Bootstrap](http://getbootstrap.com/) or [Compass](http://compass-style.org/). At the very least studying a framework like Bootstrap will introduce you to a very competent way of solving common problems on websites, and in some cases companies will begin designing sites or applications using a basic framework like Boostrap, and so knowing the existing structure and classes in it can be very helpful. Compass makes it easier to write CSS that’s supported across many browsers and adds its own timesaving tips to a project. Knowing how to work within an existing framework is a good skill to have in general; at my job, one of the senior developers wrote his own internal front end CSS framework, and knowing how to work with existing structure is certainly an important skill.

12. Basic knowledge of web servers and how they work so you can understand at least a little bit what backend developers do. In general, when you work in the web world, the more you know about the nuts and bolts about how web servers actually work and the full request cycle for a website or web application, the more help you will be.

13. How to work with APIs. Experiment with some common APIs like Google Maps and Twitter, and see what you can build with them.

## If you are interested in a more technical position/being a front end engineer, then try to do these things:

(This is not my current area of expertise, but from working with front end engineers and senior developers, I think these are at least good starting points.)

1. Know JavaScript very well. Be able to write “vanilla” JavaScript without the help of a framework or library. Understand object-oriented design.

2. At the same time, be able to work comfortably with different JavaScript libraries and frameworks, including the basics of server-side JavaScript like Node.

3. Know the MVC software model, and popular MVC frameworks and how they interact with the front end. Keep up to date with the new darling frameworks, and be able to leap into a new framework and learn it at a base level quickly.

4. Understand and know how to do test-driven development.

5. Eventually, be able to learn more than one language relatively quickly. Understand the similarities between different languages and be flexible enough to pick up the basics of one quickly.

## If you are interested in more of a design or UX role, then try to do these things:

1. Have a good basic design sense and sensibility. You can teach good design principles, just like you can teach someone to draw passably well. There are rules around things like typography and grid systems that are taught, and you should at least know a little bit about them. If you only had to learn two things in relation to graphic design, I would say learn about typography and grid systems, and then learn how to translate those principles onto the web.

2. Speaking of typography, learn about the different options for type on the web. Look into TypeKit, Google WebFonts, and hosting your own font files using CSS3′s @fontface. Know what you can do with CSS3 and text on the web. Gone are the days when you have to use images of text on websites. A lot of what you can do in PhotoShop with text is now possible just with CSS.

3. Likewise, speaking of grids, look into existing responsive CSS grid systems and how they can be used to speed up your design and development process.

4. Like the more technical developer staying up to date with new JavaScript MVC frameworks, a more design-oriented developer should stay up to date with the latest fads in web design. There are many sites dedicated to showcasing the latest and greatest in web design (a few I like are [Siteinspire](http://www.siteinspire.com/), [The Best Designs](http://www.thebestdesigns.com/), and [Worthy of Note](http://worthyofnote.co.uk/category/inspiration/)); look at them, open up your inspector tools and learn from them, and develop your tastes.

I also hope it goes without saying, but whatever you decide to do in this field, have work and examples to back it up. You should almost certainly have a website. Some very talented people with a lot of open source contributions or great coding chops may be able to get away with just a Github page or an active StackOverflow account, but I have never seen a job listing that didn’t want at least some examples of code and design in the wild, and a great place to showcase these is on your own personal page. Also consider your online self: do you keep a blog, are you active on Twitter or other places where employers can see a favorable side of you, or where potential clients can get to know you? This isn’t necessary, but can be a help.

Finally, I didn’t do enough of this, but having started this calendar year to get more into the local Portland technology scene, I cannot say enough the advantages that networking has in terms of getting a job and getting a feel for the industry in whatever place you want to work. [Meetup.com](http://www.meetup.com/) has never failed in helping me find local developer meetups. Most meetups welcome beginners and may have specific beginner groups, too. Get on mailing lists for the languages and technologies you are interested in, go to meetups, talk to people.

Good luck! If you have any tips I didn’t cover, feel free to share them in the comments.
