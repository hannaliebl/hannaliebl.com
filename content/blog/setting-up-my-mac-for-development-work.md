+++
blogcategories = ["Guide"]
date = "2015-01-23T00:00:00-00:00"
draft = false
featured = ["false"]
summary = "Here's how I set up my dev environment."
blogtags = ["My Setup", "Dev Tools", "Resources"]
title = "Setting Up My Mac for Development Work"

+++
I started a new job recently, which meant a new work computer. I also gave myself a two-week break in between jobs, so I gave up the lovely Macbook Air I had been using at my previous job and turned back to my older Macbook Pro for personal web development work. That means I basically set up my development environment twice over the course of a few weeks, and having done it twice, I want to share how I set things up.

I’m assuming a Mac environment, by the way…

1. First I create a user and login. Then I switch some basic OS X settings to suit my preferences: I make the dock smaller, turn on touch to click for the trackpad, and tweak some notification settings. I also set fun things like my wallpaper here. I also set up basic Finder settings, like exposing hidden files. To do this, go to the Terminal and type:
~~~bash
defaults write com.apple.finder AppleShowAllFiles YES
~~~
Then hit enter and relaunch Finder. I create some basic folder structure here as well – I like to have a code/ and src/ folder at my user root, for example.

2. Then I go on a downloading spree! First, because it takes so long, I get started on installing Xcode and the Xcode Command Line Tools. Now, Windows has a nice little app called [Ninite](https://ninite.com/) that automatically installs apps for you, and the most similar I’ve found is [GetMacApps](http://www.getmacapps.com/). In any case, however I get them, I download Chrome and Firefox, music apps like Spotify and Last.FM, VLC to watch video files, Transmission for torrents, Dropbox for cloud backups, Sourcetree for visual Git management, Evernote for notes (and saving recipes…best use of Evernote I’ve found), Sublime Text 3 as my editor, iTerm2 to serve as my terminal, DiskInventoryX to better see what files are taking up hard drive space, Flux so I can fall asleep at night, and Spectacle for window management shortcuts.

3. Then, I begin to set up my development environment. I set dock shortcuts to Sublime Text, Sourcetree, and iTerm2. I add some sweet colors to my iTerm2 profile and tweak any keyboard shortcuts in iTerm2 that I need (the show/hide shortcut, in particular.)

4. I start to install utilities and globally-needed packages. I always start with [Homebrew](http://brew.sh/), the best package manager for OS X. Then through Homebrew, I install Node and Git.

5. At this point I configure Git. I add an SSH key for Github, set up global .gitignore to ignore system files like .DS_Store files, and set up my .gitconfig (set my default editor, email address, etc.)

6. Next I configure my .bash_profile. I add some shortcuts, history via the up arrow, color options to the shell, and configure my command prompt. I keep my command prompt pretty simple: just my username, current path, and then git branch information followed by the good ol’ $ sign. I have a few shortcuts for common commands in git, like ‘gitst’ for ‘git status’ and ‘gitco’ for ‘git checkout’. I also make a shortcut for Python’s simple HTTP server, because sometimes it’s useful just to pop it open to look at files served through a real web server. My [dotfiles](https://github.com/hannaliebl/dotfiles) are on Github if you are curious about those.

7. At this point I symlink to <code>subl</code>, Sublime Text’s build in command line tool. This allows me to type ‘subl filename’ and then have that file open up in Sublime. This is done by typing the following into the terminal:
~~~bash
ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
~~~

8. Then, after I make sure everything in my .bash_profile is working and my command prompt looks like I want it to, I install global npm packages like bower, gulp, grunt, and grunt-cli.

9. Then I turn to customizing Sublime text. I install the [Sublime Text package manager](https://packagecontrol.io/) and then install the [Predawn theme](https://github.com/jamiewilson/predawn). The other packages I install are [SASS](https://github.com/nathos/sass-textmate-bundle), [coffeescript](https://github.com/aponxi/sublime-better-coffeescript), and [Jade](https://github.com/davidrios/jade-tmbundle) syntax highlighting, [emmet](https://github.com/sergeche/emmet-sublime), [advancednewfile](https://github.com/skuroda/Sublime-AdvancedNewFile), [Angular JS code completion](https://github.com/angular-ui/AngularJS-sublime-package), and a [whitespace trimmer](https://github.com/SublimeText/TrailingSpaces).

10. I round this out (which up until now is basically a good set up for front end development and JavaScript development) by installing some things for Rails development — through Homebrew, I install Ruby and postgres and then install Rails. Finally, I download [PGadmin](http://www.pgadmin.org/) and [postgresapp](http://postgresapp.com/), as I have thus far only used Postgres with Rails development.

11. Finally, I customize Chrome a bit. I download some must-have extensions like [Adblock Plus](https://adblockplus.org/) and [LastPass](https://lastpass.com/). I also download the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) extension to hook into automatic page refreshing during development and [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en) extension for some Angular-specific JavaScript console information.

And that’s it! I would love to hear about your development and machine set up in the comments.
