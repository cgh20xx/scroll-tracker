import { EventEmitter } from 'eventemitter3';
import { throttle, debounce } from './utils';


const modFunc = {
  throttle,
  debounce,
};

class ScrollTracker extends EventEmitter {
  constructor(settings) {
    super();

    // 強制鎖定 wait 不可小於 100，避免在可變更新率的螢幕畫面在更新太慢的情況下會重覆觸發 PROCESSED_SCROLL。
    if (settings.wait !== undefined && settings.wait < 100) {
      settings.wait = 100;
    }
    const defaultSettings = {
      target: window,
      mode: 'throttle',
      wait: 500,
    };

    this.settings = Object.assign({}, defaultSettings, settings);
    this.target = this.settings.target;
    this._scrollY = 0;
    this._prevScrollY = 0;
    this._deltaY = 0;
    this._direction = 0; // 1:向下捲 0:沒捲 -1: 向上捲

    this._scrollHandler = this._scrollHandler.bind(this);
    
    if (this.settings.mode === 'throttle') {
      const throttleOptions = {};
      if (settings.options) {
        throttleOptions.leading = settings.options.leading;
        throttleOptions.trailing = settings.options.trailing;
        this.returnFunction = modFunc[this.settings.mode](
          this._processedScrollHandler.bind(this),
          this.settings.wait,
          throttleOptions
        );
      } else {
        this.returnFunction = modFunc[this.settings.mode](
          this._processedScrollHandler.bind(this),
          this.settings.wait
        );
      }
      this.returnFunction = modFunc[this.settings.mode](
        this._processedScrollHandler.bind(this),
        this.settings.wait,
        throttleOptions
      );
      
    } else if (this.settings.mode === 'debounce') {
      this.returnFunction = modFunc[this.settings.mode](
        this._processedScrollHandler.bind(this),
        this.settings.wait,
        settings.options?.immediate
      );
    } else {
      console.error('[ScrollTracer] mode should be throttle or debounce');
    }
  }

  get scrollY() {
    return this._scrollY;
  }

  get deltaY() {
    return this._deltaY;
  }

  get direction() {
    return Math.sign(this._deltaY);
  }

  // scrollHeight: 可捲動的高度
  get scrollHeight() {
    return this.target.document.body.offsetHeight - this.target.innerHeight;
  }

  // scrollBarHeight: 捲軸bar的高度
  get scrollBarHeight() {
    return (
      this.target.innerHeight *
      (this.target.innerHeight / this.target.document.body.offsetHeight)
    );
  }

  get scrollRatio() {
    return this.scrollY / this.scrollHeight;
  }

  _scrollHandler(e) {
    this._scrollY = Math.round(this.target.scrollY);
    this._deltaY = this._scrollY - this._prevScrollY;
    this._prevScrollY = this._scrollY;
    this.emit('SCROLL', e);
  }

  _processedScrollHandler(e) {
    this.emit('PROCESSED_SCROLL', e);
  }

  track() {
    this.target.addEventListener('scroll', this._scrollHandler);
    this.target.addEventListener('scroll', this.returnFunction);
    this.emit('TRACK');
  }

  untrack() {
    this.target.removeEventListener('scroll', this._scrollHandler);
    this.target.removeEventListener('scroll', this.returnFunction);
    this.emit('UNTRACK');
  }
}

export default ScrollTracker;
