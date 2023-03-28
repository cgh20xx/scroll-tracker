import { EventEmitter } from './eventemitter3';
export default class ScrollTracker extends EventEmitter {
  constructor(settings) {
    super();
    const defaultSettings = {
      target: window,
    };
    this.settings = Object.assign({}, defaultSettings, settings);
    console.log(this.settings);
    this._scrollHandler = this._scrollHandler.bind(this);
  }

  _scrollHandler() {
    console.log('scroll ');
  }

  start() {
    this.emit('START');
    this.settings.target.addEventListener('scroll', this._scrollHandler);
  }

  stop() {
    this.emit('STOP');
    this.settings.target.removeEventListener('scroll', this._scrollHandler);
  }
}
