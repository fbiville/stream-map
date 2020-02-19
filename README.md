# Transform stream and promises

`MapTransform` defines a simple [`map`-like operator](https://rxjs-dev.firebaseapp.com/api/operators/map) to work with Node streams.
In order to support both synchronous and asynchronous functions, `MapTransform` 
"promisifies" the user-defined map function.

It works very well until an error occurs.
Try for instance:
```shell script
➜ node example.js
Send an integer, Ctrl-C to stop
0
(node:4352) UnhandledPromiseRejectionWarning: Error: division by zero
    at MapTransform._function (/Users/fbiville/workspace/stream-map/example.js:11:32)
    at /Users/fbiville/workspace/stream-map/map-transform.js:12:33
    at processTicksAndRejections (internal/process/task_queues.js:94:5)
(node:4352) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:4352) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
... process hangs ...
```

The promise gets rejected because `callback` throws when given an error.
An obvious is to catch that error and ignore it, but that does not seem like a good idea.
