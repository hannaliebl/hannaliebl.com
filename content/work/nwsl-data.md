+++
categories = ["Personal Projects"]
date = "2016-03-15T13:16:35-07:00"
draft = false
featured = ["true"]
featured_img = "/img/nwsl-data-thumb.jpg"
summary = "A website with interactive graphs detailing stats for the National Women's Soccer League."
tags = ["JavaScript", "D3", "Data Visualization"]
thumbnail = "/img/work/nwsl-data.png"
title = "NWSL Data"
site_link = "http://www.nwsldata.com"

+++
<div class="text-center inline-image-container content-container-expanded">
  <img src="/img/work/nwsl-data.png" alt="A screenshot of a graph showing the total goals scored per player." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">A graph of goals scored, with sorting and filtering controls.</div>
  </div>
</div>

I'm a big women's soccer fan, and I saw an opportunity to improve upon the basic tabular data the National Women's Soccer League made available on its [stats page](www.nwslsoccer.com/Stats/index_E.html) by making a site displaying those statistics as interactive graphs. I used AngularJS, a powerful front-end JavaScript framework, in conjunction with D3, the premier JavaScript data-binding and visualization library.

<div class="text-center inline-image-container">
  <img src="/img/work/nwsl-data-3.png" alt="Goals scored, filtered down by team, in this case, Portland" class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The same goals scored graph as above, but only showing the Portland Thorns players.</div>
  </div>
</div>

I wanted to display league-wide statistics but also give users the option to filter those stats down on a team-by-team basis. Additionally, I wanted users to be able to sort graphs in a variety of ways–by interacting with data visually, we can comprehend it better, and I wanted users to have the freedom to explore the data. Angular helps build rich applications with lots of interactivity, and D3 has robust support for updating and drilling down into data sets smoothly, without loss of context. By leveraging these technologies, I could create the interactive graphs that I needed. I managed to encapsulate all the interactive behaviors associated with a graph inside of a reusable piece of Angular code called a directive, which meant I could easily create a variety of charts with different data while preserving the same sorting and filtering controls.

<div class="content-container-expanded">
  <div class="row">
    <div class="col-6">
      <div class="text-center inline-image-container">
        <img src="/img/work/nwsl-data-1.png" alt="Goals allowed per game sorted by total goals allowed" class="img-responsive img-center"></img>
        <div class="caption-container">
          <div class="inline-image-caption">Goals allowed per game sorted by total goals allowed.</div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="text-center inline-image-container">
        <img src="/img/work/nwsl-data-2.png" alt="Goals allowed per game sorted by teams" class="img-responsive img-center"></img>
        <div class="caption-container">
          <div class="inline-image-caption">Goals allowed per game sorted by teams.</div>
        </div>
      </div>
    </div>
  </div>
</div>

I also wrote a small Express server to serve the JSON data to my Angular application and configured and deployed the entire site on a Digital Ocean server. The project taught me a lot about the whole range of development work, from concept to deployment. I hope to keep this site updated in upcoming NWSL seasons and include more graphs and data visualizations as data becomes available.
