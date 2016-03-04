# PromiseToRetry [ ![Codeship Status for firmfirm/promise-to-retry](https://codeship.com/projects/c3d88730-bd0d-0133-cfbe-129a4e5cf2b4/status?branch=master)](https://codeship.com/projects/136432)

Utility functions that helps dealing with Javascript Promises.

  - `ensure(fn => Promise, cb)` is a helper function to retry some action returning Promise until it succeeds.
  - `setTimeoutToPromise(fn => Promise, wait)` waits for specified amount of time before invoking your function. Resolves with promise resulting from provided fn.
  - `new Queue().queue(fn => Promise)` invokes functions one by one (waits for firstly enqueued functions to resolve their results)

Usage:

`bower install --save promise-to-retry`

```html
<link rel="import" href="bower_components/promise-to-retry/promise-to-retry.html">
```

```javascript
PromiseToRetry.ensure(function() {
  // return your promise that might fail,
  // etc. instead of this it could do Promise.reject
  return Promise.resolve('ensured');
})
.then(function(result) {
  console.log(result); // 'ensured'
})
.catch(function(error) {
  // this can never happen
});

PromiseToRetry.setTimeoutToPromise(function() {
  // this is delayed by 1000ms
  return Promise.resolve('delayed');
}, 1000)
.then(function(result)) {
  console.log(result); // 'delayed'
}
.catch(function(error) {
  // this can still happen
});

var queue = new PromiseToRetry.Queue();
var first = queue.queue(() => new Promise(...));
queue.queue(() => {
  // this will not get called until first promise resolves
  return Promise.resolve('second');
});
```
