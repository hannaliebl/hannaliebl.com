+++
workcategories = ["Personal Projects"]
date = "2012-02-26T14:48:30-07:00"
draft = false
featured = ["false"]
featured_img = ""
site_link = "../../../lab/find-your-legislator"
summary = "Utilizing the Sunlight Foundation and Google Map APIs to help people find their legislators."
worktags = ["Design", "JavaScript", "Develpment"]
thumbnail = "/img/work/find-your-legislator.png"
title = "Find Your Legislator"

+++
<div class="text-center inline-image-container content-container-expanded">
  <img src="/img/work/find-your-legislator.png" alt="A screenshot of the site displaying senators and representatives for an inputted address." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The site takes an address and finds the local senators and representatives for that address.</div>
  </div>
</div>

This was a personal project to practice working with JavaScript and APIs. The site looks up legislators based on a user-inputted address. The base styles are Bootstrap that I modified to create a simple design with responsive breakpoints. The page uses a jQuery script to take an inputted address and then uses the [Google Maps API](https://developers.google.com/maps/) to geocode that address into latitude and longitude coordinates. The coordinates are then used with [Sunlight Lab's Congress API](https://sunlightlabs.github.io/congress/) to look up the legislators that match the location. To improve the UI, I also added classes to the displayed legislator names so that they are colored to correspond to party and legislative house.
