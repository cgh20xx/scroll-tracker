class ScrollTracker {
  constructor(settings) {
    const defaultSettings = {
      target: window,
    };
    this.settings = Object.assign({}, defaultSettings, settings);
    console.log(this.settings);
    // this.target = options
  }

  start() {
    this.settings.target.addEventListener('scroll', function (e) {
      console.log('scroll');
    });
  }
}

export { ScrollTracker as default };
