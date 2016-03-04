(function(window) {

  window.PromiseToRetry = window.PromiseToRetry || {
    /**
     * Similar to setTimeout.
     * Delays `func` invocation and returns it's results.
     * `func` must return a Promise.
     */
    setTimeoutToPromise: function(func, wait) {
      var resolve, reject;
      var promise = new Promise(function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
      });
      setTimeout(function() { func().then(resolve, reject); }, wait);
      return promise;
    },

    /**
     * Invoke provided function.
     * Reinvokes automatically if promise that function returned failed.
     * Each retry has a bigger delay.
     */
    ensure: function(func, cb) {
      if (!func) throw "Missing func in ensure"
      var numTries = 0;
      var fn = function() {
        return func().catch(function(e) {
          var wait = 100 * Math.pow(2, ++numTries);
          if (cb) cb({
            tries: numTries,
            wait: wait,
            error: e
          });
          return PromiseToRetry.setTimeoutToPromise(fn, wait).catch(fn);
        });
      };
      return fn();
    },

    Queue: function() {}
  };

  PromiseToRetry.Queue.prototype.queue = function(fn) {
    var self = this;
    var resolve = function() {
      return self._resolving = fn().then(function(result) {
        self._resolving = false;
        return result;
      });
    };
    if (this._resolving) {
      return this._resolving.then(resolve);
    }
    return resolve();
  }

})(window);
