// import mitt from 'mitt';
// console.log(mitt);
import { EventEmitter } from './eventemitter3';
// import EventEmitter from '../node_modules/eventemitter3/dist/eventemitter3.esm.js';
// import EventEmitter from 'https://unpkg.com/eventemitter3@latest/dist/eventemitter3.umd.min.js';

console.log(EventEmitter);
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
    this.settings.target.addEventListener('scroll', this._scrollHandler);
  }

  stop() {
    this.settings.target.removeEventListener('scroll', this._scrollHandler);
  }
}
