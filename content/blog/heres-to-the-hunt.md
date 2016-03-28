+++
categories = ["Web Development"]
date = "2014-02-11T18:23:04-08:00"
draft = false
featured = ["false"]
tags = ["Guide", "PostgresSQL", "Rails"]
title = "Here’s to the Hunt (Also, Remember Postgres.app’s Version Name When Changing your PATH)"
summary = "A Postgres problem, how I fixed it, and why this is what coding is all about."

+++
If you’ve done anything with web development (or coding in general), you’ve probably run into a problem that starts with this thought, “oh, [feature X] seems cool, let me go check the documentation and install [feature X], it can’t be that hard…” and then reemerge, hours and many tabs later, to have found the problem you were trying to solve or feature you wanted to add needed about 10 additional steps to make work.

This happened to me a few nights ago. I was going through [Michael Hartl’s Rails Tutorial](http://ruby.railstutorial.org/), and at the end of Chapter 3, I thought it would be fun to install Heroku’s [Postgres.app](http://postgresapp.com/) to better align my Rails development database with Heroku’s production database. The [installation instructions](http://postgresapp.com/documentation) were simple. The problem happened because OS X is installed with another version of postgres, and you had to update your PATH to include the location in /Applications of the Postgres.app in order to use that app and not the default OS X version. I edited my bash profile to include the link given in the documentation:  

<pre class="language-bash">
  <code class="language-bash">
    PATH="/Applications/Postgres.app/Contents/MacOS/bin:$PATH"
  </code>
</pre>

But, little did I know this was actually wrong, and in later versions of Postgres.app the application is named along with the version number. Here’s the right address to add to your PATH, as of this version of postgres.app:

<pre class="language-bash">
  <code class="language-bash">
    PATH="/Applications/Postgres93.app/Contents/MacOS/bin:$PATH"
  </code>
</pre>

So the Googling began. Some people ran into problems with psql installations with Homebrew, which didn’t apply to me. Others had other more obscure problems with their PATH, which also didn’t apply to me.

27 tabs later, I found the answer in a [Github bug report](https://github.com/PostgresApp/PostgresApp/issues/137#issuecomment-27281773) page. It was pretty obvious; in fact, the solution is right there in the name of the app I downloaded, but I was just following the documentation directions a little too strictly. I am a little ashamed to admit I didn’t figure it out sooner. But that’s partially why I’m writing this: hopefully, in your frantic Googling, this page will show up in search results and you will have the answer

But I’m also writing this to ask you to remember the hunt. Really, that’s part of why I like coding–the hunt for the solution. The countless tabs. The fun in taking lots of information from different sources and synthesizing it down to apply to your own situation in order to get something useful from it, and eventually make something cool with that information. I’m getting better at enjoying this process and at asking for and looking for help in better ways. Here’s to the hunt.
