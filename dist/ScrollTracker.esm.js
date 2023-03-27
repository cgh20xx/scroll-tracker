class ScrollTracker {
  constructor(settings) {
    const defaultSettings = {
      target: window,
    };
    this.settings = Object.assign({}, defaultSettings, settings);
    console.log(this.settings);
    this._scrollHandler = this._scrollHandler.bind(this);
  }

  _scrollHandler() {
    console.log('scroll');
  }

  start() {
    this.settings.target.addEventListener('scroll', this._scrollHandler);
  }

  stop() {
    this.settings.target.removeEventListener('scroll', this._scrollHandler);
  }
}

export { ScrollTracker as default };
