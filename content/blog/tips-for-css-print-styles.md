+++
blogcategories = [
  "CSS",
]
blogtags = [
  "Web Design",
  "Print Styles"
]
featured = [
  "true",
]
summary = "Learn how to make your website look good on paper...yes, actual paper."
date = "2017-05-04T10:14:18-07:00"
draft = false
featured_img = "/img/print-css.jpg"
title = "Tips for CSS Print Styles"

+++
I've done a decent amount of work on CSS print styles over the years, and I thought I'd share what I've learned. Print styles may seem a bit outdated, but there are definitely still businesses that need them and times when your app or website may need to be optimized for a printer.

## The Basics
There are two main ways to handle print styles: linking to a separate print CSS stylesheet and setting `media="print"` on that link, or using media queries. Generally using media queries is preferred since you only use one HTTP request for all your styles. Here's how the media query for print looks:

~~~css
@media print {
  /*Your print styles here!*/
}
~~~

### Print Emulation
Firefox and Chrome both offer print emulation modes, which is very useful since the only other way to check if things look ok is via the print dialogue preview or actually printing a page to a printer yourself. In Chrome you get to it by opening the developer console, hitting ESC, and on the Rendering tab check the Emulate CSS Media checkbox and select "print" in the dropdown. In Firefox open the developer console and type `media emulate print`.

### Helper Class
The first thing I do (and Bootstrap does as well) is set up a helper class like `.hidden-print` to hide certain elements when printing. Generally you don't want to print things like headers and footers or navigational areas, and so you just add the helper class to those elements. All the helper class really needs is `display: none` set on it.

### Text and Links
Other common things you may want to do: increase or decrease the font size to make it more legible for the printed page. If your users will likely print the page out in black and white, changing your global text color to pure black might also be useful.

You may also want special handling for anchor links. Generally underlining your links when a user prints them is good enough, but if you want to display the full URL after the link, you can add special styles using pseudo selectors to do that:

~~~css
a:after {
  content: " (" attr(href) ") ";
}
~~~

A link ends up looking like this: Go to [google ( https://www.google.com/ )](https://www.google.com/).

### Margins with @page
You can control the margins of the entire page with the `@page` declaration (and there's no need to put this inside the print media query). This doesn't work in Safari but is well-supported in all other modern browsers. You should set the margin size to a known print value like `cm` or `in` since pixels don't necessarily translate as you expect them to the printed page. Here's a very basic example:

~~~css
@page {
  margin: 3cm;
}
~~~

Users can still override this in their own print dialogue settings, but doing this gives them a reasonable default.

### Backgrounds
There are some settings that you can't tweak, and you need to depend on your users to adjust their print settings when the browser print dialog comes up. The most important option is whether or not they print backgrounds. By default most people will have this turned off, so you can't depend on any background styles to show up!

This becomes important for certain UIs that use background color or background images to impart information. If you have a calendar, for example, that depends upon different colored backgrounds to differentiate the days, you should make sure to add some differentiating styles to them in print view as well. An easy way is to style the borders in a different way.

At [RADAR](https://www.radarfirst.com/) we have a heatmap that assesses the severity of a given data breach incident, and it needs to be informative both in default and print views:

<div class="row">
  <div class="col-6">
    <div class="text-center inline-image-container">
      <img src="/img/normal-view.png" alt="A heatmap in normal view" class="img-responsive img-center"></img>
      <div class="caption-container">
        <div class="inline-image-caption">The default view of the heatmap.</div>
      </div>
    </div>
  </div>
  <div class="col-6">
    <div class="text-center inline-image-container">
      <img src="/img/print-view.png" alt="A heatmap in print view" class="img-responsive img-center"></img>
      <div class="caption-container">
        <div class="inline-image-caption">The print view of the heatmap.</div>
      </div>
    </div>
  </div>
</div>

We use `double`, `dashed`, and `solid` border styles to create this effect.

### CSS Grids
The translation from screen to paper depends on screen resolution and print resolution, but in general, if you are using a modern CSS grid, the print view will be at a screen resolution where floated columns tend to begin to stack. That may be an issue for you, so you should tweak those collapsing settings in your print media query and confirm that it looks as expected by emulating the print mode.

## Potential Quirks
The biggest quirk I ran into with print styles is CSS `page-break` (`page-break-after`, `page-break=before`, `page-break-inside`) styles. There may be reasons to apply a page break to elements on your page, and the page break will only work if its parent elements aren't floated. In many CSS grid layouts every column will be floated, so be sure to add a `float: none` style to floated elements if you need your page break to show up.

There still may be times when designing a totally separate print view is the best solution for your website or application. I can imagine some complicated pages that would be better served by a link to a separate print view where you can more tightly control the layout of the page.
