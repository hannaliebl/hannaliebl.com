+++
date = 2021-03-20T11:50:12-04:00
draft = false
title = "Finding and Killing Processes By Port on Unix-like Systems"
blogcategories = ["Snippets"]
blogtags = ["Unix"]
featured = ["false"]
summary = "Learn how to kill those pesky runaway Node (or other) processes using the `lsof` and `kill` commands."
+++

Another snippet post! Snippets are my attempt to write short posts about common problems or short concepts that I run into during development.

This happens from time to time to me, particularly with runaway Node processes. You try to start your app on localhost, but get a message like: `EADDRINUSE, Address already in use` or maybe `listen tcp 127.0.0.1:3000: bind: address already in use`. You don't have anything running on the port that you can find to stop, though, so what do you do?

## `lsof` to the Rescue

`lsof` is a Unix command that means "list open files," which means it lists files that are opened by processes running on your system. By default running `lsof` will display a huge amount of info, because at any given time there are a ton of processes running on your machine.

To narrow down the specific process that is running on a given port, use the `-i` flag. For example, to list the process running on port 3000, run: `lsof -i :3000`. Note the colon in there!

This will print some columnar data for you. It might look something like this:

```
COMMAND  PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    5750 hanna   28u  IPv4 0x66edcffc34e07861      0t0  TCP *:hbci (LISTEN)
```

The important info here is `PID`, which stands for Process Identifier.

## `kill` the Process!

Now, you can use this PID to kill the runaway process with the `kill` command! I always pass the `-9` flag to `kill`. This specifically passes a `KILL` signal to that process, which will effectively kill frozen or unresponsive processes.

To follow along with the example above, this is how I would kill that pesky Node process I found with `lsof` above:

```
kill -9 5750
```
