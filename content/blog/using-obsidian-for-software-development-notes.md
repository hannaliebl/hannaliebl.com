+++
date = 2021-07-03T09:04:06-04:00
draft = false
title = "Using Obsidian for Software Development Notes"
blogcategories = ["Guides"]
blogtags = ["Learning to Code", "Productivity", "Resources", "Dev Tools"]
featured = ["true"]
featured_img = "/img/obsidian-graph.png"
images=["/img/using-obsidian-for-software-development-notes-twitter.png"]
summary = "How I use Obsidian to become a better developer, learn new things effectively, and develop a personal knowledge base."
+++

At first glance [Obsidian](https://obsidian.md/) is "just" a note-taking app that's built on Markdown. That alone is pretty cool, which I will get into later, but Obsidian is also a full knowledge-management system that has helped me immensely with organizing and retaining information I learn related to software development.

## Obsidian Works on Top of Markdown

I've used other note-taking apps in the past, notably (...see what I did there?) Evernote, but one of the worst things about most note-taking apps is that they are built on proprietary formats. Evernote changed its pricing model a few years ago, so I stopped using it as much. This is the first issue because note-taking software is only useful if I can use it to write notes, and if my access to the software changes, my habits related to taking notes will also suffer. The second issue is that I will always need to use the Evernote app to have easy access to my notes, and so if Evernote decides to change its pricing model again or the software changes significantly or the company goes under, I will lose access to my notes. The same is true with web-based apps like Notion.

Obsidian, by contrast, uses two basic formats to allow you to read and write notes: Markdown files and folders on your computer. If Obsidian ever disappears or changes, I will still have folders on my computer of Markdown notes, and I will always be able to read and edit them with any basic text editor.

See, this is such a small but important, foundational part of why I love Obsidian: at its core, it is built on non-proprietary, common formats, and it leaves your notes in a state that isn't controlled by any single piece of software. This is always what I look for when deciding on something that will allow me to organize and edit my files: if that software ever disappears, will it leave behind coherent, organized files that I can still access easily in other ways? (This is why I don't use or enjoy Apple Photos, by the way.)

## Markdown is Great for Software Notes

Markdown is also specifically great for notes about programming. It's already a format I'm familiar with because it's the format for documentation on Github and it's the format Hugo (which runs this site) uses for post content. It supports code blocks and syntax highlighting inside those code blocks, so referencing code directly inside a note is very easy to do.

I used to try to take notes on paper when I was learning something new, and while I think there is a time and place for paper notes, I have found myself drawn more and more to Markdown as the best format for notes related to software. And then when I started using Obsidian, it allowed me to link and organizing existing Markdown notes I already had, which was handy.

## Links in Obsidian

I wasn't being entirely truthful when I said Obsidian doesn't change anything inside my notes. The only non-native element Obsidian can add, optionally, to a note is something called a backlink, and it is denoted with double brackets `[[like this]]`. The moment I put double brackets around text in Obsidian and command-click on that text, Obsidian will create a new note with the title of the text I just bracketed. If I put double brackets in a note and start typing, it will also search against all my existing note titles to see if I would like to create a backlink to an existing note.

And just like that, two notes are linked together. A great way to think about this is like a Wikipedia article. Wikipedia is wonderful as a repository of knowledge, but it's also a great example of a densely linked body of knowledge. One given article will link out to many others, so much so that you can play games to see how many clicks it takes to get from one article to the other (see the [Wikipedia game "5-clicks-to-Jesus"](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game)).

This act of linking is so small but so important in turning notes into a true body of knowledge, what some people like to call a "second brain."

### The Graph View

One really neat feature of Obsidian is the graph view: a visual overview of how all your notes link together. Here is my modest collection, for reference:

<div class="text-center inline-image-container">
  <img src="/img/obsidian-graph.png" alt="My Obsidian graph view, with my Home note at the center." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">My Obsidian graph view, with my Home note at the center.</div>
  </div>
</div>

## My System

At present, I use folders to roughly organize my notes. I have a Home note that is the central link of my knowledge base. It links out to other sub-notes that serve as the hub of knowledge specific to one category. These hub notes are often called a "Map of Content" (MOC.) A MOC for me serves as an index for a subcategory in my notes.

I use Obsidian for more than software notes, so my Home note has many categories: Career, Parenting, House/Garden, Projects, and others. I'm always refining my organization system, but for now, surfacing larger themes/projects/categories makes sense to me.

But delving into my software development notes, I keep a separate folder for notes dedicated to classes I've taken. I then also keep other notes in the top level of my `Software Development/` folder about other things I've learned. Maybe I watched a talk or read a blog post talk, so I will start a note there. I also keep lists of software ideas and projects I might want to work on.

<div class="text-center inline-image-container img-left-inline">
  <img src="/img/obsidian-file-name-emoji.png" alt="Using emojis in notes I want to come first." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Using emojis in notes I want to come first.</div>
  </div>
</div>

You can use emojis in your note titles, and I often make the primary MOC note in a given folder start with an emoji so it is sorted to the top of the list and is easy to pick out.

<div class="clear"></div>

### Blog Post Management and Idea Generation

In addition to software development notes, I've found Obsidian very useful for managing blog posts and drafts. I keep a folder of drafts and published posts in my notes, and can easily transfer them to this Hugo blog as Hugo uses Markdown, too.

Obsidian also helps with idea generation for blog posts. I can easily link to notes I've taken on a topic I want to write about, and just get "pen-to-paper," so to speak, on ideas easily and incorporate them into my knowledge base. I try to create a no-pressure approach to writing initial blog posts: even a single sentence or series of brief notes can easily turn into a full-fledged post later on.

## Syncing

For now, I store my notes in a private Github repository to sync them between computers. I think this is fine and works well for me. I have read promising reviews of [syncthing](https://syncthing.net/), a secure file-syncing software, but I haven't tried it yet. Obsidian also offers a paid sync service for a monthly fee.

## Licensing and Mobile Options

Obsidian is free for personal use, but you can [buy](https://obsidian.md/pricing) a commercial license or a personal license to support the developers. Buying a license also grants you beta access to Obsidian's mobile app.

## Resources

There is a lot of information about personal knowledge management and note-taking online. The [Obsidian forums](https://forum.obsidian.md/) are great for updates on the software as well as in-depth discussions about note-taking and knowledge management strategies. [Obsidian Roundup](https://obsidianroundup.org/) is a user-curated list of weekly resources and news about Obsidian that is well-worth reading.

Finally, it can be helpful to see examples of how other people use Obsidian. Obsidian has a paid publishing option (to host and publish your notes online), and paging through examples of published notes can be a great way to get inspiration into how to organize your notes. [This post](https://forum.obsidian.md/t/the-all-obsidian-publish-s-collection-by-leo-latest-update-20210324/7248) from the Obsidian forums links to many examples of people who have published their notes online.
