class WindowResize {
  constructor() {
    this._resizeId;
    this._isStarted = false;

    window.onresize = this._onResize.bind(this);
  }

  _addToStack(prop, fn) {
    if (this[prop]) {
      this[prop].push(fn);
    } else {
      const arr = [];
      arr.push(fn);
      this[prop] = arr;
    }
  }

  _onResize() {
    if (!this._isStarted) {
      this._isStarted = true;
      this._startResizing();
    }

    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(this._doneResizing.bind(this), 500);
  }

  _startResizing() {
    (this.onceArr || []).forEach((fn) => fn());
  }

  _doneResizing() {
    this._isStarted = false;
  }

  onceOnStart(fn) {
    this._addToStack('onceArr', fn);
  }
}

export const windowResize = new WindowResize();



