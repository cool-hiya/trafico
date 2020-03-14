import Accordion from '../utils/accordion';
import {windowResize} from '../utils/window-resize';

const faqSection = document.querySelector('.faq');

if (faqSection) {
  const toggles = faqSection.querySelectorAll('.panel__toggle');
  const content = faqSection.querySelectorAll('.panel__content');
  const container = faqSection.querySelector('.faq-list');
  const accordion = new Accordion(container, toggles, content);

  const onResizeStarted = () => {
    const activeIndex = accordion.activeIndex;

    if (activeIndex) {
      accordion.hide(activeIndex);
    }
  }

  windowResize.onceOnStart(onResizeStarted);
}
