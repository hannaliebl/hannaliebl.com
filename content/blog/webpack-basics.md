+++
blogcategories = ["JavaScript"]
blogtags = ["Webpack", "Build Tools"]
date = "2016-10-25T12:50:04-07:00"
draft = false
featured = ["true"]
featured_img = "/img/webpack-basics.png"
summary = "Learn the basics of webpack, a powerful module bundler for front end assets."
title = "Webpack Basics"

+++
I've been digging into webpack at work recently. I thought I would write some articles about what I have learned. This is a basic introduction to webpack. My next article will cover some advanced uses and potential pitfalls I've run into.

## What is Webpack?
Webpack is a module bundler for front end assets. It supports CommonJs and AMD modules. This article will use CommonJs as the module syntax, but feel free to substitute AMD syntax in for CommonJs `require` and `module.exports` statements. At its most basic command-line usage, webpack takes an entry file and an output file name: `webpack ./entry.js output.js`. Assuming entry.js uses either CommonJs or AMD modules to import modules, the resulting output.js will be one bundled file with all of the dependencies that entry.js needs along with the code in entry.js. Webpack reads the dependency tree from the input file in order to build a single file with all the dependencies.

Webpack is not just for JavaScript–you can require and bundle CSS, HTML, images, and fonts with webpack. Webpack alone only knows how to process JavasSript, but using add-ons called loaders and plugins we can accept non-javascript files as input and also output non-javascript files as well. We will get into the details of that later on. Because it can handle every type of front end asset, webpack is extremely powerful. It's also highly configurable, and can statically analyze your codebase to find common files required by multiple entry points to increase the performance of, say, a single page application by bundling common code in one file that can then get cached by the browser.

## Installation
Install webpack globally via npm: `npm install webpack -g`. Once you have a project you want to use webpack in, install it to that project and save it to your package.json's devDependencies: `npm install webpack --save-dev`.

## Configuration
Most projects will use a configuration file: webpack.config.js. This file should live in the root directory of your app. Webpack has a ton of configuration options, and we will go over some common and useful ones. Once you have a config file, just running `webpack` from the command line will bundle your app using the options provided in the configuration file.

Generally, a webpack config file begins with defining webpack by requiring it and then exporting the configuration object:

<pre class="language-javascript">
  <code class="language-javascript">
  // using commonjs module syntax to require webpack, which is installed in our node_modules folder
  var webpack = require('webpack');

  module.exports = {
    // config goes here!
  }
  </code>
</pre>

### Entry
The file that webpack looks at to find dependencies to bundle goes into the entry value. You can have the entry value be a string representing a relative file path or an array of file names: `entry: './src/main.js'` or `entry: ['file1.js', 'file2.js']`.

You can have multiple entry files (which in turn means you will have multiple bundled output files) by setting the entry value to an object with multiple keys. This is common when you have vendor files or need a bundled version of your app for users who are logged in vs. logged out. The key of each entry when there are multiple entries is the filename you want your bundle to end up as, and the value is the file path: `outputteFileName: './src/my-entry-file.js'`.

In the case below we are telling webpack to consider two separate entries: our app, with the main entry point for our application given as the value, and a vendor file, with an array of module names. Webpack will look into the node_modules folder to resolve those dependencies. These options do not define the final output, though–we do that in the output section.

<pre class="language-javascript">
  <code class="language-javascript">
  entry: {
    app: './src/main.js',
    vendor: ['jquery', 'moment']
  }
  </code>
</pre>

### Output
The output object is how you specify what files webpack actually builds. All you need is the filename key, which takes a string–in the case of having one entry file, the string will become the outputted file name. If you want to move your final outputted bundle to a folder, fill in that path entry. You can use the node variable `__dirname` here to get the directory in which the webpack config script is being run from. Finally, the output object can also take a publicPath option, which gets written to references to the file in other outputted files: for example, in css urls or script tags referenced in html files, assuming you have the proper plugins to write those file types.

If you only gave one entry file, your output can be as simple as this:

<pre class="language-javascript">
  <code class="language-javascript">
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/'
  }
  </code>
</pre>

If you use multiple entry points, you need to make sure to have multiple outputs as well. This is done by using the `[name]` wildcard, which is the same as the key you gave to each value in the entry object. So, if your entry has three values:

<pre class="language-javascript">
  <code class="language-javascript">
  entry: {
    app: './src/main.js',
    loggedout: './src/loggedout.js',
    vendor: ['jquery', 'moment']
  }
  </code>
</pre>

Your output should look something like this:

<pre class="language-javascript">
  <code class="language-javascript">
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/'
  }
  </code>
</pre>

This will then make `/dist/app.js`, `/dist/loggedout.js`, and `/dist/vendor.js` files.

### Resolve Extensions and Dev Server
The `resolve.extensions` option takes an array into which you pass file extension strings. This tells webpack to consider those file extensions when trying to resolve a module. If you include '.js' in the array, for example, you no longer need to remember to add the js file extension in your require statements. It's just a handy way to save some time when writing your requires.

You should include an empty string in the array, which tells webpack to continue to resolve modules that do have their file extension provided with that given extension.

<pre class="language-javascript">
  <code class="language-javascript">
  resolve: {
    extensions: ['', ',js', '.coffee', '.less']
  }
  </code>
</pre>

`webpack-dev-server` is a package that can be installed via npm that gives you a node development server at localhost:8080. You can configure it the webpack configuration under `devServer`. The main options are `devServer.inline` and `devServer.contentBase`.

If you set `inline: true`, the server will live reload your changes.

The `contentBase` option takes a directory string. The dev server will serve from this directory, if specified.

<pre class="language-javascript">
  <code class="language-javascript">
  devServer: {
    inline: true,
    contentBase: 'build/'
  }
  </code>
</pre>

The dev server loads everything in memory, meaning there will be no compiled or bundled files in your project files unless you explicitly build them with the `webpack` command (or another build command) first.

## Loaders and Plugins
Loaders and plugins extend webpack's functionality. Some are built into webpack by default, but many are installed via npm. Loaders handle individual files; they teach webpack to handle and process files other than JavaScript, like languages that compile to JavaScript like CoffeeScript and TypeScript but also other front end filetypes like css. Plugins generally apply to your entire bundle. You can use a plugin to uglify your outputted JavaScript, for example, or to instruct webpack to build an index.html file based on the files you require in your entry file.

### Loaders in Action
Let's assume you have CoffeeScript files in your application. You will want to install the coffee-loader (via npm, and save it as a development dependency using the `--save-dev` flag) in order for webpack to understand the CoffeeScript files and convert them into JavaScript. A full [list of loaders](https://webpack.github.io/docs/list-of-loaders.html) can be found in the webpack docs. Loaders can be used directly in require statements in your main import file or in the configuration file. Here are examples of each:

#### Using Loaders Inline
Let's say your main entry file is main.js and you are requiring a CoffeeScript module, component.coffee, in that main file. Instead of writing `require(./component.coffee)` you would pipe that require through a loader inline: `require(coffee!./component.coffee)`. You can pipe a file through multiple loaders, too. This is common with SASS or LESS files: they generally get piped through a loader that can convert them into css and then either into styles that get written inline or into a separate file. The loaders get piped from right to left. Here is an example using less: `require('style!css!less!./style.less')`.

It gets tedious to remember to pipe a file through the proper loaders, however, so webpack provides options to include loaders in the configuration file.

#### Using Loaders via the Webpack Config
Basically, in the webpack config, you write a small regex to catch all the file extensions you want to run through a loader or series of loaders, and then write the loaders you want to use with those file extensions. They get added onto the module key in the config:

<pre class="language-javascript">
  <code class="language-javascript">
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html-loader'},
      {test: /\.(pug|jade)$/, loader: 'pug-html-loader'},
      {test: /\.coffee$/, loader: 'coffee'},
      {test: /\.less$/, loader: 'style!css!less'}
    ]
  }
  </code>
</pre>

The test key is the regex the loader is run against, and then the loader key contains a single or multiple loaders in sequence to process the file.

### Plugins in Action
Plugins will be covered more extensively in the next post on advanced webpack, but you basically add any plugins you want to use along with their separate configuration options into a plugins array in the webpack config. Let's use a very basic example–extracting styles into a separate CSS file. Remember, by default, webpack will just output JavsScript that writes those styles inline, but the generally preferred method is to have a separate CSS file. To do that we need to use the extract text plugin, found under extract-text-webpack-plugin on npm.

Assume we have a main.js file. In it we require not only the JavaScript components that make up our application, but any styles we need as well. That main main.js file looks like this:

<pre class="language-javascript">
  <code class="language-javascript">
  require('./component1.js');
  require('./component2.js');
  require('./component1.styles.css');
  require('./component2.styles.css');
  </code>
</pre>

In order to generate both an app.js file and a styles.css file to cover all the JavaScript and CSS files required by the main entry file, you would add the extract text plugin to your webpack config in the plugins array. On top of that, you add the plugin to the loader section to specify that CSS files should be run through the extract text plugin. PLugins will have their own separate rules and configuration options, which is why writing an example of a plugin here is only specific to the task at hand. In general, plugins are where a lot of power comes from in webpack, but also a lot of complications and potential confusion.

Here is the implementation in our webpack config of using the extract text plugin:

<pre class="language-javascript">
  <code class="language-javascript">
  var ExtractTextPlugin = require("extract-text-webpack-plugin");

  // inside the webpack config...
  module.exports = {
    // other config goes here - entry, output, etc\
    module: {
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
      ]
    },
    plugins: [
      new ExtractTextPlugin("styles.css")
    ]
  }
  </code>
</pre>

## A Complete webpack.config.js File
Here's a complete webpack config file based on all the things covered above. We have a single entry file, main.js, which requires application JavaScript and styles. We want webpack to output an app.bundle.js, a vendor.bundle.js, and a styles.css file into a dist/ directory.

<pre class="language-javascript">
  <code class="language-javascript">
  var webpack = require("webpack");
  var ExtractTextPlugin = require("extract-text-webpack-plugin");

  module.exports = {
    entry: {
      app: "./src/js/main.js",
      vendor: ["jquery", "lodash", "moment"]
    },
    output: {
      path: __dirname + '/dist/',
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ["", ".css", ".js"]
    },
    module: {
      loaders: [
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
      ]
    },
    devServer: {
      inline: true,
      contentBase: 'src/'
    },
    plugins: [
      new ExtractTextPlugin("styles.bundle.css")
    ]
  }
  </code>
</pre>

There's still more to do. We don't do any cache-busting with hashes, minify or uglify our JavaScript, deal with images or other assets, or optimize our bundles in any way. We will cover all that and more in the next article, on advanced webpack.
