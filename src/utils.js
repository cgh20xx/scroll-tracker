export function isWindow(obj) {
  return Object.prototype.toString.call(obj) === '[object Window]'
    ? true
    : false;
}
