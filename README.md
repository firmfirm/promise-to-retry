# PromiseToRetry

Helper function to easily retry some action returning Promise until it succeeds.

Usage:

`bower install --save promise-to-retry`

```html
<link rel="import" href="bower_components/promise-to-retry/promise-to-retry.html">
```

```javascript
PromiseToRetry.ensure(function() {
  // return your promise that might fail
  return new Promise(function(resolve, reject) {
    ...
  });
}).catch(function(error) {
  // this can never happen
});

PromiseToRetry.setTimeoutToPromise(function() {
  // this is delayed by 1000ms
  return new Promise(function(resolve, reject) {
    ...
  });
}, 1000).catch(function(error) {
  // this can still happen
});
```
