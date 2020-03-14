export default class AnchorMenu {
  constructor(anchors, activeClass) {
    this._anchors = [...anchors];
    this._activeClass = activeClass;
    this._activeId = null;

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', this._onAnchorClicked.bind(this));
    })
  }

  _onAnchorClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.hash;

    window.location.hash = id;
    this._moveToSection(id);
  }

  _setActiveLink(id) {
    if (this._activeId) {
      const lastActiveLink = document.querySelector(`[href="${this._activeId}"]`);
      lastActiveLink.parentElement.classList.remove(this._activeClass);
    }

    this._activeId = id;
    const activeLink = document.querySelector(`[href="${this._activeId}"]`);

    activeLink.parentElement.classList.add(this._activeClass);
  }

  _moveToSection(id) {
    const section = document.querySelector(`[data-id="${id}"]`);

    if (section) {
      section.scrollIntoView({behavior: 'smooth'});
    }

    this._setActiveLink(id);
  }

  update() {
    const id = window.location.hash;
    this._moveToSection(id);
  }
}
