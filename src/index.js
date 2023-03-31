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
    this.scrollY = 0;
    this.prevScrollY = 0;
    this.direction = 0; // 1:向下捲 0:沒捲 -1: 向上捲

    this._scrollHandler = this._scrollHandler.bind(this);

    this.returnFunction = modFunc[this.settings.mode](
      this._intervalScrollHandler.bind(this),
      this.settings.wait,
      this.settings.options
    );
  }

  _scrollHandler(e) {
    // console.log(e);
    this.scrollY = Math.round(this.target.scrollY);
    // console.log(`scrollY: ${this.scrollY}`);
    const diffY = this.scrollY - this.prevScrollY;
    this.direction = Math.sign(diffY);
    // console.log('direction:', this.direction);
    this.prevScrollY = this.scrollY;
    this.emit('SCROLL', e);
  }

  _intervalScrollHandler(e) {
    const currentScrollY = Math.round(this.target.scrollY);
    console.log(currentScrollY);
    this.emit('INTERVAL_SCROLL');
  }

  addEvent() {
    this.target.addEventListener('scroll', this._scrollHandler);
    this.target.addEventListener('scroll', this.returnFunction);
    this.emit('ADD_EVENT');
  }

  removeEvent() {
    this.target.removeEventListener('scroll', this._scrollHandler);
    this.target.removeEventListener('scroll', this.returnFunction);
    this.emit('REMOVE_EVENT');
  }
}

export default ScrollTracker;
