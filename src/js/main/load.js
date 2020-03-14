window.onload = onLoaded;

const loader = document.querySelector('.loader');
document.body.style.overflow = 'hidden';

function onLoaded() {
  document.body.style.overflow = '';
  loader.classList.add('loader--finished');
}
