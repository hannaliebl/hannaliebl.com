+++
categories = ["Personal Projects"]
date = "2016-03-14T12:43:44-07:00"
draft = false
featured = ["true"]
featured_img = "/img/portland-adventure-thumb.jpg"
img_credit = "Photo: flickr.com/ronguillen/"
thumbnail = "/img/work/choose-your-own-portland-adventure.png"
tags = ["JavaScript", "Backbone", "Design"]
title = "Choose Your Own Portland Adventure"
summary = "A Backbone application using the Yelp API to help users find interesting things to do in Portland, Oregon."
site_link = "http://portland-adventure.herokuapp.com/"
+++
<div class="text-center inline-image-container content-container-expanded">
  <img src="/img/work/choose-your-own-portland-adventure.png" alt="A screenshot of the front page of our application, featuring Portland's current weather." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The first page of our application, featuring Portland's current weather.</div>
  </div>
</div>

I took an evening JavaScript class at Portland Code School in the summer of 2014, and the final three weeks of the course were devoted to developing a capstone project. My two other group members and I spent the time designing and building the Choose Your Own Portland Adventure app. The goal was to provide users with an easy interface to click through options and then get a Mad Libs-type story at the end with custom results from Yelp.

<div class="text-center inline-image-container img-left-inline">
  <img src="/img/work/portland-adventure-2.png" alt="A screenshot of the list of choices users are asked to answer." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Some of the choices you are asked to make along the way.</div>
  </div>
</div>

The app depends on randomness on multiple levels to almost never return the same result twice; first, the questions at each level are randomly chosen (but always match the choices available), and second, the choices made correspond to an array of Yelp keywords, and only one of them is sent off to Yelp to do the searching. The end result is an adventure that never feels the same but is tailored toward user choices.

I focused on three parts of the application:

1. I headed up organizing the JavaScript that runs much of the front end of this single page application, using [Backbone](http://backbonejs.org/) to organize everything. There are multiple views that handle click events and a model to record user choices and results.

2. The design of the pages and application in general–we wanted something clean and modern but with a touch of whimsy; after all, the end result is a story, and so some hint of storybooks or the printed word is important. I also made sure the application is responsive and works on mobile devices as well as larger desktop screens.

3. I helped integrate the Forecast.io API on the Express server to make it consumable to our app through an API route. I also helped nail down async issues with the Yelp API results coming back after the results page. Basically, I helped connect our back end and API calls to our front end.

If you are interested, the entire application is on [Github](https://github.com/PCS-Javascript-Junkies/Capstone-Project).

<div class="text-center inline-image-container">
  <img src="/img/work/portland-adventure-1.jpg" alt="A screenshot of the story and recommendations our application can generate for you." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">An example of the adventure our app can generate for you.</div>
  </div>
</div>
