+++
date = "2020-03-07T01:07:13-05:00"
draft = false
title = "Moving My Hugo Site to Netlify"
blogcategories = ["Guide"]
blogtags = ["Static Sites", "Hugo", "Netlify"]
featured = ["false"]
summary = "I moved this site to Netlify, and write about how it works with Hugo to improve my deployment process (and how I fixed syntax highlighting on this blog.)"
+++

This site is now being hosted on [Netlify](https://www.netlify.com/). Netlify is an "all-in-one platform for modern web projects." They have a free tier that allows you to, essentially, host your site on their CDN, hook up to a Github repository, and then run a build command on every commit to deploy your site. They offer a lot of serverless extras like form handling and paid solutions for identity management, but at its core for someone like me, Netlify is a static site deployment and hosting solution packaged in a user-friendly UI.

I had been serving this site from an AWS S3 bucket for a while, and it worked alright. There were steps I could have taken to automate deploys better, but I never spent much time on it, so I would have to build the site myself and then copy it over to the bucket every time I wanted to update it.

Netlify offers a much more automated, easy-to-use deployment UI, and had features like built-in HTTPS support. On a whim, I decided to try Netlify out one night. I was pleasantly surprised that I could, within minutes, run my site from Netlify and automatically deploy it based on Github commits.

## Hugo on Netlify Setup

The first step is adding the repository you want to Netlify. They support Github, Gitlab, and Bitbucket repositories. The next step is telling Netlify how you want to build your site. This site is built with Hugo. To build a Hugo project, the command is `hugo`, and it creates/builds into the `public/` directory. For most Hugo sites that is what you want to set Netlify up to do (basically, give it a build comment of `hugo` and a publish directory of `public`.)

I do some extra things with my site (I copy some extra folders into the public directory because they are essentially one-off sites that aren't managed by Hugo), so you can specify whatever you want your build command to be. In my case, I run it through a deploy script, so for me the build field on Netlify is `./deploy.sh`.

To test my deploys were working, I had to update the `baseurl` in Hugo's config file to the netlify domain my project defaulted to. I did this before moving my own domain over to Netlify to work out the kinks first.

## Hugo Version

The only major issue I ran into was my syntax highlighting wasn't working on Netlify. Recent versions of Hugo use [Chroma](https://github.com/alecthomas/chroma) for compiled syntax highlighting (rather than a front-end solution like Prism or Highlight JS.) When I looked at my site, though, the code blocks weren't being compiled with the proper inline styles and span tags.

I realized this is because by default Netlify builds Hugo sites with an older Hugo binary, from a version before Hugo included Chroma (I'm not sure what version, exactly, Netlify uses...Chroma was added in Hugo version 0.28).

The best thing to do is to match the binary that you use to build your site locally with the binary that Netlify uses. To test this, type `hugo version` on your computer. For me, I'm on `v0.61.0`.

This is easily set in Netlify in the Environment section - basically, setting an environment var that Netlify can use during its build/deploy process. The var you want to add is `HUGO_VERSION`. I set mine to `0.61.0`, and now Netlify successfully builds the Hugo binary from the version I se. From my deploy logs:

```text
11:23:42 PM: Installing Hugo 0.61.0
11:23:44 PM: Hugo Static Site Generator v0.61.0-9B445B9D/extended linux/amd64 BuildDate: 2019-12-11T08:33:29Z
```

You can also opt to include a `netlify.toml` config file in your Hugo project, and Netlify will know how to use it to configure itself. I opted not to do this for now for simplicity's sake, but that is another easy option for configuring Netlify to work with your Hugo site. The Hugo docs [discuss this in more detail](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/#configure-hugo-version-in-netlify). 

## Downsides?

S3 can handle any amount of traffic and charges you pennies per GB. Netlify has bandwidth limits (at the time of writing, 100 GB per month for the free tier, 20$ per 100 GB after that.) S3 keeps you in the AWS ecosystem, which some people may prefer. For a low-traffic site like mine, so far, the ease of deployment and HTTPS support is well worth the switch from S3 to Netlify.

