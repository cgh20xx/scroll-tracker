import { EventEmitter } from './eventemitter3';
import { throttle, debounce } from 'lodash-es';
import { isWindow } from './utils';

// 備忘
// window: 抓捲軸高用 window.scrollY 抓捲軸高用 window.
const modFunc = {
  throttle,
  debounce,
};

class ScrollTracker extends EventEmitter {
  static aa = 'aaaa';
  constructor(settings) {
    super();
    const defaultSettings = {
      target: window,
      mode: 'throttle',
      wait: 0,
    };
    this.settings = Object.assign({}, defaultSettings, settings);
    this.target = this.settings.target;

    this.returnFunction = modFunc[this.settings.mode](
      this._scrollHandler.bind(this),
      this.settings.wait,
      this.settings.options
    );
  }

  _scrollHandler(e) {
    console.log(Math.round(this.target.scrollY));
    this.emit('SCROLL');
  }

  addEvent() {
    this.target.addEventListener('scroll', this.returnFunction);
    this.emit('ADD_EVENT');
  }

  removeEvent() {
    this.target.removeEventListener('scroll', this.returnFunction);
    this.emit('REMOVE_EVENT');
  }
}

export default ScrollTracker;
