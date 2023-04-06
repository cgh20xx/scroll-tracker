# ScrollTracker

這是一個偵測頁面捲軸的套件

## API

### new ScrollTracker(settins)

### settins
| Attributes | Default | Description | 
| - | - | - |
| target | window | 偵聽 scroll 事件的目標 (目前只支援 window 和 window.top) |
| mode | 'throttle' | 使用節流模式或防抖模式 'throttle' \| 'debounce' |
| wait | 500 | 需要節流的毫秒數，或要防抖的毫秒數，若低於 100 將強制為 100 |
| options |  |  |
|  |  |  |

## Extentds
-  EventEmitter
```js
const st = new ScrollTracker({
  target: window, // 目前限綁定 window 物件
  mode: 'throttle', // throttle | debounce
  wait: 500, // 限制最低為 100ms
  options: {
    leading: true,
    trailing: false,
  },
});
```
