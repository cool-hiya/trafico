export function throttle(callback, limit = 500) {
  let wait = false;                // Initially, we're not waiting
  return function () {             // We return a throttled function
    if (!wait) {                   // If we're not waiting
      callback.call();             // Execute users function
      wait = true;                 // Prevent future invocations
      setTimeout(function () {     // After a period of time
        wait = false;              // And allow future invocations
      }, limit);
    }
  }
}
