export const urlChanged = new Promise((resolve, reject) => {
  resolve();

  window.onhashchange = function () {
    resolve();
  }
});
