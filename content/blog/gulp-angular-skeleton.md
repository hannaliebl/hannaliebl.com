+++
categories = ["Web Development"]
date = "2014-09-12T00:00:00-00:00"
draft = false
featured = ["false"]
summary = "My starter template for Angular apps, using Gulp."
tags = ["AngularJS", "Gulp", "Taskrunners"]
title = "Gulp Angular Skeleton: A Front End App Skeleton for Building Angular Apps"

+++
I’m a fan of [Grunt](http://gruntjs.com/), particularly in combination with [Yeoman](http://yeoman.io/), but I wanted to try my hand at [Gulp](http://gulpjs.com/), another task runner, but based on Node streams. So as a weekend project I decided to set up my own Gulp-based Angular project. (If you want to get right to the code the whole thing is on [Github](https://github.com/hannaliebl/gulp-angular-skeleton), and my annotated Gulpfile is available as a [Gist](https://gist.github.com/hannaliebl/0a4fa4ff39445649452e).)

I wanted the following functionality from Gulp:

1. A task to watch for changes as I develop the front end, including:
2. SCSS compiling and minification into a single CSS file.
3. JavaScript linting.
4. A build task to nicely bundle everything up for deployment, including:
5. Copying all the CSS, HTML, and JavaScript over into a dist/ folder.
6. Image compression.
7. JavaScript concatting and uglifying into a single main.js file.
8. Some helper tasks to make minified Angular JS files work properly and include data attributes onto Angular directives to make the markup HTML5 compliant.
9. Taking Bower dependencies and minifying and concatting them into a vendor.js file and saving that reference in index.html.
10. A continually running test service that runs tests on changes.

That’s actually a lot to do, and was a bit trickier than expected (and so the weekend project leaked into the week, as is often the case). The end result is my own [Gulp-Angular-Skeleton repository](https://github.com/hannaliebl/gulp-angular-skeleton). I still need to integrate tests and image minification, but I felt like it was ready enough to release now.

## How Gulp-Angular-Skeleton Works

Before I get into the details, I want to talk about Gulp from a high level: I like Gulp because it feels more intuitive than Grunt. It’s just JavaScript functions as opposed to Grunt’s configuration object approach. It feels easier to put together something custom, and if you are used to Node-style programming, it’s even more intuitive. The basic premise is that you give Gulp a source file, pipe it through plugins, and then it returns an output. You can write tasks and then chain tasks together (so a ‘watch’ task can include other tasks, like SASS compiling and JavaScript linting.) Gulp also provides methods like gulp.watch to watch a certain file path and then do something when it changes, like trigger a livereload event.

In my skeleton app, I first decided to use Gulp to only manage the front end. I have the whole app running on a simple Express server, seen in server.js, but even though there are Gulp plugins to deal with running server-side JavaScript, I really like to have a separate Terminal tab open running the server. When you get into writing APIs or dealing with more complicated server-side things, I think having the server process separate from the front end is useful. With that in mind, I decided to include the good ol’ reliable [nodemon](http://nodemon.io/) to run the server, so in one tab, you just run ‘nodemon app/server.js.’

I made the front end of the app explicit from the server side by including it all inside the app/public folder. It is this folder and the dist/ folder that Gulp is concerned with. I made two tasks, ‘gulp watch’ to run continually during development, and ‘gulp build’ to prepare a build for deployment. At the top of the gulpfile I set variables and require various packages; I used npm to install and include them in packages.json.

Then, I wrote out the two tasks using gulp.task to define them. The watch task is meant to be run continually during development, and you can run it from the command line simply by typing ‘gulp watch.’ It watches all files for changes and livereloads them, compiles CSS, and lints the JavaScript for errors. The task is defined and then uses the built in gulp.watch method to watch certain file paths (like the directory with all the SCSS files) and run other tasks on change.

The second task is ‘gulp build’, meant to be run when you want to build a deployable version of your app. It writes everything to dist/. The server.js file gets copied over, CSS gets minified, JavaScript gets uglified and concatted, and it bundles up all your Bower components as well.

There are some trip ups that I found, however. First is the way Gulp handles errors. Some examples I found online have you write a task like this, for example:

<pre class="language-javascript">
  <code class="language-javascript">
    gulp.task('empty-dist', function() {
        gulp.src(paths.build.main, { read: false })
        .pipe(rimraf());
    });
  </code>
</pre>

This doesn’t work, however, because the gulp.src is not returned. This is [described](https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support) in Gulp’s own documentation for handling asynchronous events, but basically, you should return gulp.src in order for it to work:

<pre class="language-javascript">
  <code class="language-javascript">
    gulp.task('empty-dist', function() {
        return gulp.src(paths.build.main, { read: false })
        .pipe(rimraf());
    });
  </code>
</pre>

The second issue related to errors is the way the gulp-jshint package handles error events. Basically, if you don’t allow for it, an error that jshint catches will stop the gulp.watch task, which is annoying if you are continually working in a file and have to constantly restart your watch task. The solution, for now, as best I could tell, is to explicitly add an end event to the stream. I did this by adding a simple error handler callback:

<pre class="language-javascript">
  <code class="language-javascript">
    function errorHandler (error) {
        this.emit('end');
    }
  </code>
</pre>

And then in the jshint task, calling it like so:

<pre class="language-javascript">
  <code class="language-javascript">
    .pipe(jshint()).on('error', errorHandler)
  </code>
</pre>

The final problem I ran into is how to define a set order for tasks. Again, the asynchronous nature of Gulp means that without defining an order, there is no guarantee the task you want to run first in a set of tasks will actually run or complete first. This is important in the build task, mainly, because before copying over HTML and minifying and concatting JS files I first want to clear out the dist/ folder of any old builds. This is also thankfully [well-defined](https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md) in the Gulp documentation, but the way you do it is write a task that accepts another task as a dependency. In my case, I wrote a build task and had it depend on a bunch of other tasks that handle all the separate pieces of the build, like a single task to simply copy the CSS over. Inside those dependent task definitions, though, I also gave them all a dependency: the empty-dist task, which is the task that actually clears out the dist/ folder in case there was anything left over from an old build. Even though all of the tasks have empty-dist as a dependency, it only runs once, and it runs in the correct order: before everything else.

Here is an example from my gulpfile. First, the build task, with all its dependencies defined in an array. After all those tasks run does the anonymous function run and the build task is complete. In this case, the anonymous function handles JavaScript uglifying:

<pre class="language-javascript">
  <code class="language-javascript">
    gulp.task('build', ['bower-files', 'copy-css', 'copy-server', 'copy-html-files'], function() {
        return gulp.src(['./app/public/js/**/*.js', '!./app/public/bower_components/**'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.build.js))
    });
  </code>
</pre>

Next is an example of a dependent task from above, which in turn has `empty-dist` as a dependency. Before `copy-css` begins, `empty-dist` must run. All the dependencies from above have `empty-dist` as a dependency themselves.

<pre class="language-javascript">
  <code class="language-javascript">
    gulp.task('copy-css', ['empty-dist'], function () {
        return gulp.src('./app/public/css/*.css')
        .pipe(gulp.dest('dist/public/css'));
    });
  </code>
</pre>

And that’s an introduction to Gulp and to my basic app skeleton framework. Let me know if you use it or if you have any other comments!
