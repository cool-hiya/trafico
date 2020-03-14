const ACC_CLASS = 'acc';
const ACC_TOGGLE_CLASS = 'acc__toggle';
const ACC_CONTENT_CLASS = 'acc__content';
const ACC_TOGGLE_ACTIVE_CLASS = 'acc__toggle--active';
const ACC_CONTENT_ACTIVE_CLASS = 'acc__content--active';

export default class Accordion {
  constructor(container, toggles, content) {
    this._toggles = [...toggles];
    this._content = [...content];
    this._container = container;
    this._activeIndex = null;

    this._setBaseClasses();

    this._toggles.forEach((toggle, i) => {
      toggle.addEventListener('click', this._onToggle.bind(this, i))
    });

  }

  get activeIndex() {
    return this._activeIndex;
  }

  _onToggle(index) {
    /** Hides previous block */
    if (this._activeIndex || this._activeIndex === 0) {
      this.hide(this._activeIndex);
    }

    /** Shows current block if it's not the same toggled one */
    if (this._activeIndex !== index) {
      this._activeIndex = index;
      this.show(this._activeIndex);
    }
  }

  _setBaseClasses() {
    this._container.classList.add(ACC_CLASS);

    this._toggles.forEach((toggle) => {
      toggle.classList.add(ACC_TOGGLE_CLASS);
    });

    this._content.forEach((content) => {
      content.classList.add(ACC_CONTENT_CLASS);
    })
  }

  hide(index) {
    const currentContent = this._content[index];

    this._toggles[index].classList.remove(ACC_TOGGLE_ACTIVE_CLASS);
    currentContent.classList.remove(ACC_CONTENT_ACTIVE_CLASS);
    currentContent.style.maxHeight = '';
  }

  show(index) {
    const currentContent = this._content[index];

    this._toggles[index].classList.add(ACC_TOGGLE_ACTIVE_CLASS);
    currentContent.classList.add(ACC_CONTENT_ACTIVE_CLASS);
    currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
  }
}
