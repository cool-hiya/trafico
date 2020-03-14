import {urlChanged} from '../utils/url-change';
import {throttle} from '../utils/throttle';
import Viewport from '../utils/viewport';
import AnchorMenu from '../utils/anchor-menu';

let menuLinks = document.querySelectorAll('.menu__item a');

if (menuLinks) {
  const anchorMenu = new AnchorMenu(menuLinks, 'menu__item--active');
  const updateMenu = () => {

  }

  const onWindowScroll = throttle(updateMenu);

  urlChanged
    .then(() => {
      anchorMenu.update();
    });

  window.onscroll = onWindowScroll;
}




