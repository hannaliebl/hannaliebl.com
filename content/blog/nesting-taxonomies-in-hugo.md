+++
date = "2020-01-13T01:07:13-04:00"
draft = false
title = "Nesting Taxonomies in Hugo"
blogcategories = ["Guide"]
blogtags = ["Hugo", "Static Sites"]
featured = ["true"]
featured_img = "/img/nesting-hugo.jpg"
summary = "At long last, I figure out how to nest taxonomies in Hugo, and implement it on this blog."
+++

I've been running this site off [Hugo](https://gohugo.io/) for almost four years, and in general I've had nothing but good things to say about it. See [my blog post](/blog/welcome-to-my-new-hugo-powered-site/) where I describe migrating this blog from Wordpress to Hugo.

## The Problem

One thing eluded me, however: the ability to nest my taxonomies per section, or per archetype. I even [asked this question](https://discourse.gohugo.io/t/section-based-tags/3069/9) on the Hugo help forums (I didn't check it for years, but it got some other potential solutions two years after I initially posed the question.)

As you can see on this blog, I have a couple of content types: namely, blog posts, like the one you're reading now, and also "work", a content type that shows off projects I do. They live in their own folder, `/blog` and `/work`, respectively. I decided to add tags and categories for each content type.

When I first built this site, I spent a long time trying to figure out how to create a link like this: `/work/categories/my-category` as opposed to Hugo's site-wide default of `/categories/my-category`, but I couldn't get this seemingly simple organizational structure to work. Because I had separate layouts and URLs for my two content types, it made sense to me to organize the tags and the categories by URL like that as well.

Try as I might, though, I couldn't figure out how to do this in Hugo with the URLs I wanted. Based on my forum post back in 2016, maybe at the time this wasn't actually possible in Hugo. Regardless, my solution for the time was to make custom taxonomies for each content type: ‘blogcategories’, ‘workcategories’, etc. This meant my url looked like: `hannaliebl.com/blogcategories/javascript/` and then `hannaliebl.com/workcategories/javascript/` which was fine, but not ideal.

And that's how it stayed for almost four years, until I started poking around with Hugo again. A lot had changed/been added (like asset management pipelines), and I was convinced that, surely, this problem had been solved by now.

## Permalinks to the Rescue
I did another forum search in 2020 and came across [this post](https://discourse.gohugo.io/t/how-to-configure-a-taxonomy-under-a-section-with-multiple-taxonomy-terms/13806/16) that said to use permalinks to re-assign taxonomies to custom URLs.

So in my config.toml I added this:
```toml
[permalinks]
  workcategories = "/work/categories/:title"
  worktags = "/work/tags/:title"
  blogcategories = "/blog/categories/:title"
  blogtags = "/blog/tags/:title"
```

And now the URLs looked exactly how I wanted them to look: `/blog/tags/javascript` and `/work/tags/javascript`. This seemed very straightforward to me, and meant I could keep my original tag and category names.

## Separate Taxonomy Terms Pages
The other issue I had to solve was fixing the terms pages and links that Hugo generates. A terms page is a list of links that shows all the tags or categories for a given piece of content and their counts. ([Here's the terms page for this blog's tags.](../tags))

You can't assign custom permalinks to taxonomy terms pages, but you can solve this by adding some custom front matter to each content folder's appropriate subfolder. I found out how to do this in [this Hugo forum post](https://discourse.gohugo.io/t/solved-change-the-root-of-a-taxonomy/20021).

This is best seen with an example, so I'll walk through how I made the `/blog/tags` work with my `blogtags` taxonomy.

1. First, add a `/content/blog/tags` folder and include an `_index.md` file inside of it.
2. Add front matter to that markdown file. Note that this front matter is meant to be a markdown table (the forum post example above doesn't make that clear, but it is the format front matter takes). Here is how that markdown file looks:

   ```python
    ---
    title: Blog Tags
    type: blogtags
    layout: terms
    ---
   ```

3. Next, create a custom layout for the blog tags terms view in: `layouts/blogtags/terms.html` and make sure to use `.Site.Taxonomies.blogtags` instead of what you would normally see in a terms layout (the default is `.Data.Terms`) Here is the relevant portion of my layout for `/blog/tags/`:

   ```html
   <div class="container page-body">
     <div class="row">
       <div class="col-12">
         <h1>{{ .Title }}</h1>
         <ul>
          {{ range $key, $value := .Site.Taxonomies.blogtags.ByCount }}
           <li><a href="/blog/tags/{{ $value.Name | urlize }}">{{ $value.Name | title }}</a> ({{ $value.Count }})</li>
          {{ end }}
         </ul>
       </div>
     </div>
   </div>
   ```

   The title comes from the front matter I defined in `/content/blog/tags/_index.md`

**Note:** This entire website is [on Github](https://github.com/hannaliebl/hannaliebl.com) for your reference, too. I poked around a fair number of Hugo sites on Github when reading through the forums, and sometimes it's helpful just to look at how an existing site is set up.
