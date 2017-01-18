+++
blogcategories = ["JavaScript"]
blogtags = ["VueJS", "UI Components"]
date = "2017-01-17T15:07:09-08:00"
draft = false
featured = ["true"]
featured_img = "/img/vuejs-table.png"
summary = "I go over beginning to learn the VueJS framework and build a basic table component."
title = "Build a Table With VueJS: Part 1"

+++
I'm learning [VueJS](https://vuejs.org), a lightweight front end JavaScript framework, and I thought a good small first project would be to build a table component. The requirements are: parse a JSON file to populate the table, and then create a table component that renders a header and row components. The row component repeats over the data from the JSON file. In part 1 we will inline the JSON data into the component data, but in part 2 we will actually read the data from a JSON file.

Our table will look like this by the end of the article:

<div class="text-center inline-image-container">
  <img src="/img/vuejs-table.png" alt="A screenshot of a table displaying the top 10 wide receiver scores for week 1 of the 2016 NFL season." class="img-responsive img-center"></img>
  <div class="caption-container">
    <div class="inline-image-caption">Stats for the top 10 wide receivers for week one of the 2016 NFL season.</div>
  </div>
</div>

This problem is basic but explores some beginning questions when learning a framework: how do you bind data to the view and how do you nest UI components together to create functionality?

## Tooling and Setup

So, let's get started! I decided to skip all the tooling questions for simplicity's sake for now. Thankfully, Vue comes with a [cli tool](https://github.com/vuejs/vue-cli) that generates a project for you. I chose the option that uses webpack to bundle all the files and a runs a local dev server runs on port 8080. All you have to do after npm installing is: `npm run dev`.

From my limited perspective so far, Vue borrows at least one thing I really like from Angular: built-in attribute directives that accomplish a lot of basic functionality you need in a front end framework: repeating over elements, adding classes, showing and hiding elements, and responding to events (like clicks!) Nice. We will use `v-for` to repeat our row components and the table data inside each row.

The cli tool generates an app component for you with a very simple `hello` component nested inside of it. I did something similar in my example: an outer app component that contains the `<sortable-table>` component. (Sidenote: you can't use default HTML tags as component names, which makes sense, hence `sortable-table` instead of just `table`–in a future article I'll actually make it sortable, by the way. Generally when referring to the component in HTML you use kebab-case and in JavaScript you use camelCase-so `sortable-table` and `sortableTable`.)

Everything begins in main.js. Here the cli tool registers or "news" a Vue instance for us:

~~~javascript
import Vue from 'vue'
import app from './app'

new Vue({
  el: '#ff-app',
  template: '<app/>',
  components: { app }
})
~~~

`el` is the HTML element on the page it hooks into–so our index.html should include a div with an id of #ff-app to begin rendering our components. The template is just a single Vue component, `<app>`, and we register that component here as well. The components listed here are locally scoped to that Vue instance only–for now this is fine, but in a bigger app globally registering components might be better. We also do ES6 imports–the whole project uses ES6 and transpiles to ES5 with Babel, which is another very nice feature of the cli tool's setup.

The app component actually uses a really neat feature of Vue: the .vue file extension. Again, webpack and the tooling provided take care of this all for us, but somewhat like React's .jsx file extension, we can shove everything we need for a component into one file: markup, styles, and JavaScript. So, here is app.vue:

~~~html
<template>
  <div class="container">
    <sortable-table></sortable-table>
  </div>
</template>
<script>
import sortableTable from './components/sortable-table'

export default {
  name: 'app',
  components: {
    sortableTable
  }
}
</script>
~~~

This app component is basically just a container div and the sortableTable component for now. We import the sortableTable component here and give the component an html template, inside of `<template>` tags that our tooling knows to look for. We could have included `<style>` tags here as well, which would by default not be scoped to the app component alone, but we can just make it a `<style scoped>` tag and it will be scoped only to that component! This can be very useful for building out a large app with many UI components, but in my example I just chose to use Bootstrap styles and link to one stylesheet in index.html.

## The Table Component

The next step is making our sortableTable component. Again, we will define everything inside of a .vue file. The first step is thinking about how we will repeat over the data, and, in turn, how the data should be formatted to create a table. First we have to repeat over heading data for the table's header. Then we need to have rows repeating, and inside those rows each piece of data needs to be put inside a corresponding `<td>`.

The data we are using, no matter where it comes from, gets introduced in the component's `data` property. The data property for a component must always be a function, and it is from here that Vue creates *reactivity* in components. Data gets defined, and assuming we don't add any new properties to the object it returns, our component is set up to react to any changes to the data. At a low level, Vue adds getters and setters to each property we initially set on data. For more info, see the [reactivity section](https://vuejs.org/v2/guide/reactivity.html) in the docs.

For now, we are simply going to define our own data in the `data` property directly. Because I love fantasy football, this table will display stats for the top 10 wide receivers from week one of the 2016 NFL season as `rowData`. I'm also providing a key for the table heading values as `tableHeadings`. Basically, this will give us a translation into a nice human-readable heading value ('Rush Yards') from the JSON key name (rushYards).

Here is the script part of our sortableTable component .vue file, with our inlined data. I've commented the pieces of it to make it easier to understand what is going on.

~~~html
<script>
  // ES6 import of the child component we need to make our table
  import tableRow from './TableRow'

  export default {
    // define the component's name
    name: 'sortableTable',
    // the components below will be locally scoped to the parents
    // component. In this case, we only need tableRow.
    components: {
      tableRow
    },
    // simply a function that returns an object with the properties
    // we need. Remember in ES6 this is the same as data: function() { ... } in ES5.
    data () {
      return {
        // Used to translate json keys into nice human-readable names
        // for the table headings
        tableHeadings: [
          {name: 'Weekly Rank', value: 'rank'},
          {name: 'Name', value: 'name'},
          {name: 'Team', value: 'team'},
          {name: 'Rec. Targets', value: 'recTarget'},
          {name: 'Receptions', value: 'receptions'},
          {name: 'Rec. Yards', value: 'recYards'},
          {name: 'Rec. TD', value: 'recTD'},
          {name: 'Rush Attempts', value: 'rushAtt'},
          {name: 'Rush Yards', value: 'rushYards'},
          {name: 'Rush TD', value: 'rushTD'},
          {name: 'Week\'s Points', value: 'fantasyPts'},
          {name: 'Total Points', value: 'fantasyPtsPerGame'}
        ],
        // sample JSON-style data that we will repeat over - each object
        // is a row in the table
        rowData: [
          {rank: 1, name: 'Brandin Cooks', team: 'NO', recTarget: 9, receptions: 6, recYards: 143, recTD: 2, rushAtt: 1, rushYards: 11, rushTD: 0, fantasyPts: 27.4, fantasyPtsPerGame: 27.4},
          {rank: 2, name: 'Antonio Brown', team: 'PIT', recTarget: 11, receptions: 8, recYards: 126, recTD: 2, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 24.6, fantasyPtsPerGame: 24.6},
          {rank: 3, name: 'A.J. Green', team: 'CIN', recTarget: 13, receptions: 12, recYards: 180, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 24.0, fantasyPtsPerGame: 24.0},
          {rank: 4, name: 'Willie Snead', team: 'NO', recTarget: 9, receptions: 9, recYards: 172, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 23.2, fantasyPtsPerGame: 23.2},
          {rank: 5, name: 'Larry Fitzgerald', team: 'ARI', recTarget: 10, receptions: 8, recYards: 81, recTD: 2, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 20.1, fantasyPtsPerGame: 20.1},
          {rank: 6, name: 'Jordan Matthews', team: 'PHI', recTarget: 14, receptions: 7, recYards: 114, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 17.4, fantasyPtsPerGame: 17.4},
          {rank: 7, name: 'Will Fuller', team: 'HOU', recTarget: 11, receptions: 5, recYards: 107, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 16.7, fantasyPtsPerGame: 16.7},
          {rank: 8, name: 'Mike Wallace', team: 'BAL', recTarget: 6, receptions: 3, recYards: 91, recTD: 1, rushAtt: 1, rushYards: 11, rushTD: 0, fantasyPts: 16.2, fantasyPtsPerGame: 16.2},
          {rank: 9, name: 'Mike Evans', team: 'TB', recTarget: 7, receptions: 5, recYards: 99, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 15.9, fantasyPtsPerGame: 15.9},
          {rank: 10, name: 'Doug Baldwin', team: 'SEA', recTarget: 11, receptions: 9, recYards: 92, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 15.2, fantasyPtsPerGame: 15.2}
        ]
      }
    }
  }
</script>
~~~

*Sidenote:* the question of how to get data is interesting. I got this data from [fftoday.com](http://fftoday.com/stats/playerstats.php?Season=2016&GameWeek=1&PosID=30&LeagueID=26955), and converted it to JSON using the invaluable [Mr Data Converter](https://shancarter.github.io/mr-data-converter/) tool. In many cases, with minimal formatting on your part, you can just copy and paste tables of data into the converter and it will output it in a variety of formats. This is very useful if you aren't scraping the data yourself, and works particularly well for a lot of sports stats that get published in tabular form.

A .vue component file also needs to have some sort of html template. The `tableHeadings` data gets repeated over with the `v-for` directive so that each `<th>` tag gets a heading: `<th v-for="heading in tableHeadings"> {{ heading.name }} </th>`. The curly braces interpolate the data that we pass in. We also repeat over our custom `table-row` component, and pass the `rowData` in with the `v-for` directive again. We need to do a little something extra here, though. In order for a child component to access a scoped version of the parent's data, we need to use the `v-bind` directive, where we tell the component to access the data under a particular name. So each object with row data comes into the tableRow component as `row`. I'm also passing in all the heading data into each row component as `headings` (because I will need to use this to key onto the correct data element in each set of row data.)

Below is the template for the sortableTable component in its entirety, demonstrating our use of the `v-for` and `v-bind` directives:

~~~html
<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="heading in tableHeadings">
          {{ heading.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <table-row v-for="row in rowData" v-bind:row="row" v-bind:headings="tableHeadings">
      </table-row>
    </tbody>
  </table>
</template>
~~~

## The Row Component

The first thing we need to do in the row component is define `props`. Props just explicitly define on a child component that data will be passed in from the parent, and under what name that data will be passed in (and locally scoped.) Props often work hand-in-hand with `v-bind` to declare how data is used in child components. Since we bound to `row` and `headings` using `v-bind`, we need to define those in our props array. Here is the JavaScript portion of the tableRow component:

~~~html
<script>
  export default {
    name: 'tableRow',
    props: ['row', 'headings']
  }
</script>
~~~

Finally, we need to define our tableRow template. Here we will combine the heading data and the row data we pass in. We will repeat over the heading data using `v-for` and use it to key over the single row object that we give each rowComponent, so that each `<td>` cell is populated with the correct piece of data:

~~~html
<template>
  <tr>
    <td v-for="heading in headings">
      {{ row[heading.value] }}
    </td>
  </tr>
</template>
~~~

Whew! That's everything we need to bind and display data into a table using Vue. For reference, here are both components in their entirety.

The table component:

~~~html
<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="heading in tableHeadings">
          {{ heading.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <table-row v-for="row in rowData" v-bind:row="row" v-bind:headings="tableHeadings">
      </table-row>
    </tbody>
  </table>
</template>

<script>
  import tableRow from './TableRow'

  export default {
    name: 'sortableTable',
    components: {
      tableRow
    },
    data () {
      return {
        tableHeadings: [
          {name: 'Weekly Rank', value: 'rank'},
          {name: 'Name', value: 'name'},
          {name: 'Team', value: 'team'},
          {name: 'Rec. Targets', value: 'recTarget'},
          {name: 'Receptions', value: 'receptions'},
          {name: 'Rec. Yards', value: 'recYards'},
          {name: 'Rec. TD', value: 'recTD'},
          {name: 'Rush Attempts', value: 'rushAtt'},
          {name: 'Rush Yards', value: 'rushYards'},
          {name: 'Rush TD', value: 'rushTD'},
          {name: 'Week\'s Points', value: 'fantasyPts'},
          {name: 'Total Points', value: 'fantasyPtsPerGame'}
        ],
        rowData: [
          {rank: 1, name: 'Brandin Cooks', team: 'NO', recTarget: 9, receptions: 6, recYards: 143, recTD: 2, rushAtt: 1, rushYards: 11, rushTD: 0, fantasyPts: 27.4, fantasyPtsPerGame: 27.4},
          {rank: 2, name: 'Antonio Brown', team: 'PIT', recTarget: 11, receptions: 8, recYards: 126, recTD: 2, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 24.6, fantasyPtsPerGame: 24.6},
          {rank: 3, name: 'A.J. Green', team: 'CIN', recTarget: 13, receptions: 12, recYards: 180, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 24.0, fantasyPtsPerGame: 24.0},
          {rank: 4, name: 'Willie Snead', team: 'NO', recTarget: 9, receptions: 9, recYards: 172, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 23.2, fantasyPtsPerGame: 23.2},
          {rank: 5, name: 'Larry Fitzgerald', team: 'ARI', recTarget: 10, receptions: 8, recYards: 81, recTD: 2, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 20.1, fantasyPtsPerGame: 20.1},
          {rank: 6, name: 'Jordan Matthews', team: 'PHI', recTarget: 14, receptions: 7, recYards: 114, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 17.4, fantasyPtsPerGame: 17.4},
          {rank: 7, name: 'Will Fuller', team: 'HOU', recTarget: 11, receptions: 5, recYards: 107, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 16.7, fantasyPtsPerGame: 16.7},
          {rank: 8, name: 'Mike Wallace', team: 'BAL', recTarget: 6, receptions: 3, recYards: 91, recTD: 1, rushAtt: 1, rushYards: 11, rushTD: 0, fantasyPts: 16.2, fantasyPtsPerGame: 16.2},
          {rank: 9, name: 'Mike Evans', team: 'TB', recTarget: 7, receptions: 5, recYards: 99, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 15.9, fantasyPtsPerGame: 15.9},
          {rank: 10, name: 'Doug Baldwin', team: 'SEA', recTarget: 11, receptions: 9, recYards: 92, recTD: 1, rushAtt: 0, rushYards: 0, rushTD: 0, fantasyPts: 15.2, fantasyPtsPerGame: 15.2}
        ]
      }
    }
  }
</script>
~~~

The row component:

~~~html
<template>
  <tr>
    <td v-for="heading in headings">
      {{ row[heading.value] }}
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'tableRow',
    props: ['row', 'headings']
  }
</script>
~~~

Check back for the next part soon, where we will do a better job of getting this data from a JSON file instead of hardcoding it ourselves inside the table component.
