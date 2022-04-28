+++
date = 2022-04-28T07:00:00-04:00
draft = false
title = "Query Vs. Find Vs. Get in React Testing Library"
blogcategories = ["JavaScript"]
blogtags = ["JavaScript", "React", "Unit Testing", "React Testing Library"]
featured = ["true"]
featured_img = "/img/query-vs-find-vs-get-react-testing.png"
images=["/img/react-testing-library-query-types-twitter.png"]
summary = "A review of the three query types in React Testing Library and when to use each one."
+++

There are three query types in React Testing Library: `query...` , `find...` , and `get...` (for finding a single element, `queryBy`, `findBy`, and `getBy` and for finding multiple elements `queryAllBy`, `findAllBy`, and `getallBy`.) So what's the difference, and how do those differences inform us about how to use these queries?

## Use `queryBy` and `queryAllBy` for when you know the elements don't exist

The `query...` queries are what you need to use when you want to assert that a given node doesn't exist.

`queryBy` returns the node for a given query if it's found and returns `null` is no elements match. `queryAllBy` returns an array of all matching nodes or an empty array if no nodes match. These empty data structures can easily be asserted against.

Really, the `queryBy`/`queryAllBy` methods should _only_ be used on assertions where the nodes that they are looking for don't exist. This is because the other two methods will return very helpful, explicit error messages that print the whole DOM when a node isn't found, which can be helpful for debugging failing tests, whereas this method will not.

Example:

```javascript
// error messaging/alerts are a common thing to assert does not exist in
// the DOM under certain conditions, so use the queryBy... query
expect(screen.queryByRole("alert")).not.toBeInTheDocument();
```

## Use `findBy` and `findAllBy` in asynchronous contexts

The most important thing to remember about the `find...` queries is that they are promise-based. They will retry to find the node/nodes that are being searched for and default to timing out their retry attempts after 1000ms.

`findBy` returns a promise which resolves to the node for a given query if it's found and rejects the promise if no element is found (or if more than one element is found that matches the query.) `findByAll` does the same thing, except it returns a promise that resolves to an array of all matching nodes.

The `findBy/findByAll` queries are useful when waiting for an element to appear or disappear in response to an event like a user action (button clicks, form submissions, etc.) or maybe something like a promise resolving (perhaps you are mocking a successful network request and changing the DOM in response to that.)

```javascript
const button = screen.getByRole("button", { name: "Submit" });
fireEvent.click(button);
await screen.findByText("Form submitted");
```

## Use `getBy` and `getAllBy` for everything else

For everything else, use the `getBy`/`getAllBy` queries! They aren't promise-based, but will return helpful error messaging if the given node/nodes you are searching for aren't found.

```javascript
const nameInput = screen.getByLabelText("Name");
// then run assertions against nameInput, or use it in setting up
// further assertions
```
