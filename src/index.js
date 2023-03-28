import { EventEmitter } from './eventemitter3';
import { throttle, debounce } from 'lodash-es';
// console.log('throttle:', throttle);
// console.log('debounce:', debounce);

export default class ScrollTracker extends EventEmitter {
  constructor(settings) {
    super();
    const defaultSettings = {
      target: window,
    };
    this.settings = Object.assign({}, defaultSettings, settings);
    console.log(this.settings);
    // this._scrollHandler = this._scrollHandler.bind(this);
    this._throttleHandler = throttle(this._scrollHandler.bind(this), 1000, {
      leading: true,
      trailing: false,
    });
    console.log(this._throttleHandler);
  }

  _scrollHandler() {
    this.emit('scroll');
  }

  start() {
    this.emit('start');
    // this.settings.target.addEventListener('scroll', this._scrollHandler);
    this.settings.target.addEventListener('scroll', this._throttleHandler);
  }

  stop() {
    this.emit('stop');
    // this.settings.target.removeEventListener('scroll', this._scrollHandler);
    this._throttleHandler.cancel();
  }
}
