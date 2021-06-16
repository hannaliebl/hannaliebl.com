+++
title = "Use React Routers History Listener With React Hooks"
date = 2021-06-16T07:06:30-04:00
draft = false
blogcategories = ["JavaScript"]
blogtags = ["JavaScript", "React", "React Hooks", "React Router"]
summary = "How to use React Router's history listener in a useEffect hook to clear a flash message."
+++

[React Router](https://reactrouter.com/) provides users with a listener that will track when a route changes. This can be useful for a number of things, but in this example, I will use this functionality to clear an alert message (also known as flash messages) when the route changes again.

You might use this pattern when you try to save information on one route (to use the classic blog post example, maybe saving a draft post). If the save is successful, the app routes you to a different page (maybe the home page of the blog), but displays an alert that tells you something like "Your draft was successfully saved." The moment you navigate away from the blog post homepage, though, you want that alert to be cleared on subsequent visits.

First, [here are the specific API docs](https://github.com/ReactTraining/history/blob/master/docs/api-reference.md#history.listen) for `history.listen` that React Router provides. So, `history.listen` takes a callback that will give some information about the current route (the router action and the current location), and it returns a function that is used to cleanup itself/unbind the even listener.

## How Do We Use This If Our App Uses React Hooks?

The fact that the changes that are being tracked by the history listener are happening independent of state and props in React suggests this should be encapsulated in a `useEffect` hook (`useEffect` is used for side effects in React.) If you return a function from `useEffect` , it invokes that function at component unmount, so this is a useful way to unbind listeners, which further suggests a `useEffect` is the proper place to encapsulate this.

## Basic setup

First, you need to import `useHistory` from `react-router-dom` to get access to `history`.

```javascript
import { useHistory } from "react-router-dom";
```

Then we get access to `history` and set up our `useEffect` hook. This example is using some contrived state that is meant to represent a simple flash alert message existing or not existing.

```javascript
// How our state to handle setting/hiding a flash alert might initially look
const [flashAlert, setFlashAlert] = useState(null);

const history = useHistory();

useEffect(() => {
  const unlisten = history.listen(() => {
    // This will be evaluated on every route change. So, if the flash alert
    // exists already and the route has changed, we want to clear it by calling
    // our state update function (setFlashAlert) with null.
    if (flashAlert) {
      setFlashAlert(null);
    }
  });
  // This function will be invoked on component unmount and will clean up
  // the event listener.
  return () => {
    unlisten();
  };
}, [history, setFlashAlert]);
```

You might want to go even farther and encapsulate this logic into a custom, reusable hook!
