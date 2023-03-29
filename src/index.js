import { EventEmitter } from './eventemitter3';
import { throttle, debounce } from 'lodash-es';
// console.log('throttle:', throttle);
// console.log('debounce:', debounce);
const modFunc = {
  throttle,
  debounce,
};
console.log(modFunc);
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

    this.returnFunction = modFunc[this.settings.mode](
      this._scrollHandler.bind(this),
      this.settings.wait,
      this.settings.options
    );
  }

  _scrollHandler(e) {
    console.log(e);
    this.emit('SCROLL');
  }

  addEvent() {
    this.settings.target.addEventListener('scroll', this.returnFunction);
    this.emit('ADD_EVENT');
  }

  removeEvent() {
    this.settings.target.removeEventListener('scroll', this.returnFunction);
    this.emit('REMOVE_EVENT');
  }
}

export default ScrollTracker;
