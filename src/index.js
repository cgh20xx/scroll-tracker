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

    // 強制鎖定 wait 不可小於 100，避免在可變更新率的螢幕畫面在更新太慢的情況下會重覆觸發 PROCESSED_SCROLL。
    if (settings.wait !== undefined && settings.wait < 100) {
      settings.wait = 100;
    }
    const defaultSettings = {
      target: window,
      mode: 'throttle',
      wait: 100,
    };

    this.settings = Object.assign({}, defaultSettings, settings);
    this.target = this.settings.target;
    this.scrollY = 0;
    this.prevScrollY = 0;
    this.direction = 0; // 1:向下捲 0:沒捲 -1: 向上捲

    this._scrollHandler = this._scrollHandler.bind(this);

    this.returnFunction = modFunc[this.settings.mode](
      this._processedScrollHandler.bind(this),
      this.settings.wait,
      this.settings.options
    );
  }

  _scrollHandler(e) {
    // console.log(e);
    this.scrollY = Math.round(this.target.scrollY);
    // console.log(`scrollY: ${this.scrollY}`);
    this.deltaY = this.scrollY - this.prevScrollY;
    this.direction = Math.sign(this.deltaY);
    // console.log('direction:', this.direction);
    this.prevScrollY = this.scrollY;
    this.emit('SCROLL', e);
  }

  _processedScrollHandler(e) {
    this.emit('PROCESSED_SCROLL', e);
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
