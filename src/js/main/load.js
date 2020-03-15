window.onload = onLoaded;

const loader = document.querySelector('.loader');

function onLoaded() {
  loader.classList.add('loader--finished');
}
