# PromiseToRetry [ ![Codeship Status for firmfirm/promise-to-retry](https://codeship.com/projects/c3d88730-bd0d-0133-cfbe-129a4e5cf2b4/status?branch=master)](https://codeship.com/projects/136432)

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
