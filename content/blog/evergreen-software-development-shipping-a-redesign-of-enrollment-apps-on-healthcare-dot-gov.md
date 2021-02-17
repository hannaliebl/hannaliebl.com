+++
date = 2020-04-12T09:23:39-05:00
draft = false
title = "Evergreen Software Development: Shipping a Redesign of Enrollment Apps on Healthcare.gov"
blogcategories = ["JavaScript"]
blogtags = ["Conference Talk", "React", "AngularJS", "Redux"]
featured = ["true"]
summary = "I gave a conference talk on how my team redesigned and reengineered three web apps on healthcare.gov, moving from AngularJS to React. This is part one of a two-part series on that talk, where I discuss the story of these three apps, how to make decisions about when to update software systems, and different strategies for keeping them 'evergreen.'"
featured_img = "/img/new-to-old-plan-card-design-island.png"
+++

I gave my first-ever conference talk at [NERD Summit](https://2020.nerdsummit.org/) in March, right at the beginning of the global COVID-19 pandemic. I was meant to give the talk in person in Amherst, MA, but the conference, like many others, ended up going remote, so I gave the talk remotely.

[Here's the link to watch on Youtube directly](https://www.youtube.com/watch?v=opaCflJhgGU), or watch it below:

<div class="text-center" >
<iframe style="margin-bottom:20px;"width="560" height="315" src="https://www.youtube.com/embed/opaCflJhgGU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I've split the content of this talk into two blog posts. This one will be less technical, but focus on how we came to our decision to move from AngularJS to React, the general strategies we used, and making the case for the importance of what Ad Hoc calls "evergreen software development," or keeping long-running software systems updated and maintainable.

The [next blog post]((../incrementally-migrating-from-angularjs-to-react)) will focus on the technical details of how we chose to move from AngularJS to React, and will maybe serve as a guide for other teams looking to do this type of work.

## What is "Evergreen Software Development"?

One of the many things I've learned while working at [Ad Hoc](https://adhoc.team/) is how to come into large, existing software systems and work to incrementally update and improve them while providing continuous service. Ad Hoc calls this type of development "evergreen software development." It's the art of software maintenance, of keeping software systems evergreen.

Evergreen software development requires thinking about our software on different timescales. How will what we are building and maintaining now look months from now or years from now? Will new team members be able to work on our software easily in the future? Will we be able to continue to gracefully add features now and in the future? Will we be able to hire people who know how to work with the tools we have chosen to build our software with a year from now? What about five years from now?

## The Apps to Update, and Two Strategies to Choose From

The team I work on at Ad Hoc maintains three applications: [Tax Tools](https://www.healthcare.gov/tax-tool/#/) (this app gives users premium values related to insurance plans for income tax filing), [Windowshop](https://www.healthcare.gov/see-plans) (without logging into healthcare.gov, this app allows you to preview health insurance plans and prices), and Plan Compare (logged into healthcare.gov, this app that allows you to shop for and then enroll in health insurance plans). Tax Tools and Windowshop are front-end only single-page apps, Plan Compare has a backend component, but a lot of its functionality/state is maintained in a single page front-end app as well.

When I started at Ad Hoc in 2017, all of these applications were built with [AngularJS](https://angularjs.org/). We decided as a team that moving these applications to a React-based frontend would keep them evergreen. Doing so would allow us to leverage the [CMS Design System](https://design.cms.gov/) and its suite of React components, would make updating and adding features easier now and in the future, and would future-proof us, at least in the medium-term, because React is heavily-used in the front-end world, and AngularJS has entered long-term support mode by Google (meaning, it won't receive meaningful updates anymore.) This was also a great opportunity to introduce a complete redesign of these applications as well, leveraging the CMS Design System, so we decided to tackle both an internal rewrite and redesign of these three apps.

We had two choices for this internal reengineering and external redesign: either take months to rewrite/redesign them in React or find a way to update them incrementally, removing AngularJS slowly, somehow shipping our changes to production at our normal biweekly or weekly cadence.

You can think of these two choices in terms of Git workflows. The rewrite method means maintaining a completely different branch (or even repository) separate from the in-production master branch. The incremental strategy means, likely, making feature branches, but then merging them into the production branch as often as possible, and releasing those changes on a regular cadence (perhaps using feature flags to hide changes for a bit...more on that later.)

## When a Rewrite is Warranted

A rewrite can be the correct choice in some cases. For us, Tax Tools was a perfect candidate for a rewrite. Tax Tools isn't a very large or complex app, it has a very defined seasonal usage (around tax season), and it was mostly feature-complete: there wasn't a lot of active development on it during the year. So in this case, it made sense to take the time to rewrite the app from scratch. We didn't need to worry about supporting/developing features on both the AngularJS version at the same time as we were working on the rewrite.

We ended up moving the AngularJS version to a branch on Git (which was useful to double-check functionality of the old version vs. the new one as we rewrote it), and then completely wiped master and started over with our rewrite. We used [Create React App](https://create-react-app.dev/) to simplify the build process and were able to successfully rewrite and launch the app over about two months, using React, Redux, and the CMS Design System.

<div class="text-center inline-image-container">
  <img src="/img/old-taxtools.png" alt="The first page of the old tax tools app." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The first page of the old tax tools app.</div>
  </div>
</div>

<div class="text-center inline-image-container">
  <img src="/img/taxtools-redesign.png" alt="The first page of the redesigned tax tools app." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The first page of the redesigned tax tools app.</div>
  </div>
</div>

## Incrementally Moving from AngularJS to React

Windowshop and Plan Compare are different than Tax Tools, though. They are actively developed, and are used more heavily throughout the year (someone can qualify for healthcare on the federal exchanges at any time, and then needs to use our apps to shop for and enroll in plans.) They are also larger and more complex than Tax Tools.

It didn't make sense to try to rewrite both apps while still maintaining and developing features and fixing bugs on the AngularJS apps, at least with our team size and structure. So, we needed to come up with a strategy to incrementally update them from AngularJS to React and implement a redesign at the same time.

### A Sidenote on RFCs

I spent some time coming up with a strategy for this incremental update and then wrote an RFC ([Request for Comments](https://en.wikipedia.org/wiki/Request_for_Comments)) document to propose those changes to my team. I think RFCs are a wonderful way to come to a consensus on a technical decision. They work asynchronously, which is great for a fully-remote team like ours. Writing an RFC helps clarify your thoughts and organizes your ideas as well. Finally, an RFC produces a valuable document that can be saved to document decisions made to future developers on your team.

### Our Rewrite Strategy

I go over the technical details of this in my [next blog post](../incrementally-migrating-from-angularjs-to-react), but at a high level, this is the strategy we came to a consensus about in the RFC and ended up using:

We began by moving some of the smallest, innermost components in the component tree to React, and used a library called [ngReact](https://github.com/ngReact/ngReact) to render them inside of our AngularJS app. Over time, more and more of these components were moved to React, subsuming large Angular parent components. State that was once in Angular controllers moved into React components or into a Redux store that we started. The Redux store was shared between the Angular and React parts of the app, allowing us to work on the shape of the store while having both the old and new parts of the app write and then eventually read from the store. Eventually, once entire subroutes were being handled by React, we could begin using React Router rather than the Angular router for routing. At a certain point, we could completely remove Angular and its dependencies!

## But What About That Redesign?

This is all well and good for an internal reworking of these apps, but, remember, we were also implementing a redesign at the same time! It didn't make sense to use to spend our time applying this redesign to the existing AngularJS components, so as we moved components to React, we also implemented this redesign. How did that work in practice, though?

### Feature Flags and Design Islands 🏝️

Our designer came up with the term "design islands," little islands of the new design that could easily live inside the old design for a time. The cards that display health insurance plan information are an example of this. They are a small piece of UI that could both be switched to React and also redesigned at the same time. While we were working on this new component, we also added a feature flag to control whether or not to show these new plan cards.

<div class="text-center inline-image-container img-expanded-container">
  <img src="/img/new-to-old-plan-card-design-island.png" alt="The old plan card compared with the new plan card, as a 'design island' in the old version of the app." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The old plan card compared with the new plan card, as a "design island" in the old version of the app.</div>
  </div>
</div>

Feature flags were how we rolled out the new design, and, subsequently, the new React components, slowly to our users. We used LaunchDarkly for our feature flags, which has nice Redux bindings. LaunchDarkly also supports different flags for different environments, which was a handy way to test our new design in lower environments before launching in production. Feature flags were an essential tool in accomplishing this redesign and internal rewrite.

<div class="text-center inline-image-container">
  <img src="/img/launchdarkly-dashboard-example.png" alt="A screenshot of how Launch Darkly's feature flag UI looks." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">An illustration of how Launch Darkly's feature flag toggles look (this screenshot is taken from their marketing docs.)</div>
  </div>
</div>

### A Note on CSS

One of the trickiest issues in releasing this redesign was some CSS conflicts. Thankfully, we had a design system with a great set of CSS utility classes, which allowed us to apply very specific styles to new components, but there were times when there were style clashes. We used some temporary things like applying a specific id to the Angular parent HTML element (via `ng-class`) to override styles using CSS specificity, and tied adding this class to a feature flag.

Another potential avenue for this is using something like CSS-in-JS, but we didn't go down that route.

## Success!

In the end, we were able to successfully launch a redesign of Windowshop and Plan Compare in time for healthcare.gov's open enrollment in the fall of 2019. Users saw a new design, but importantly, the apps were also built with React. This decision and process took months of work, but the result is that we have two apps that we are confident will be easier to maintain and build upon in the future!

<div class="text-center inline-image-container">
  <img src="/img/old-design.png" alt="The old design of the plans page." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The old design of the plans page.</div>
  </div>
</div>

<div class="text-center inline-image-container">
  <img src="/img/new-design.png" alt="The new design of the plans page." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">The new design of the plans page.</div>
  </div>
</div>

## Potential Downsides

The downside of this incremental approach is, first, bundle size. For a while, we shipped both React and Angular, as well as supporting libraries (for example, a slider library in Angular, and `ng-react` itself.) This is one of the main downsides of the incremental approach, but we decided a small performance hit was worth it for a bit as we worked on this project.

The other downside is general complexity. For months, we were needing to work in AngularJS and React, and keep track of what was still being managed in Angular and what was still being managed in React. It also required our team to have a good understanding of how both libraries worked. There is also a freedom that comes from completely rewriting an app, and allows you to more substantially reorganize application state and organization, but because we worked piecemeal, we often directly mirrored how the AngularJS and then the new React part handled state.

## How to Prevent This in the Future?

The final question/thought that I will leave you with, and this is a bit more philosophical, is how to prevent this from happening again. In 2014 or so, AngularJS was a logical choice for building a single-page app. The first two jobs in tech I held, from 2013 - 2017, all were AngularJS jobs. We all know how fast things change in the front-end world, though.

One way forward is to choose libraries rather than entire frameworks to build our apps. Libraries have a smaller footprint and are potentially easier to swap in and out. At this point React is getting closer to a framework in terms of footprint size, but, still, deciding to use Redux as our state management solution is an example of how this could work: if we ever decide to move on from React, we could keep Redux, and maintain our state management there and integrate it with another UI library that could replace React.

Other than that strategy, though, I don't have a good answer for this! It's something technical teams will need to always think about, and explore the tradeoffs when choosing a particular tech stack, and when deciding to move on from a particular tech stack.
