# ScrollTracker

這是一個偵測頁面捲軸的套件。

由於節流及防抖核心是使用 Lodash 詳細說明可參考官方文件 [_.throttle](https://www.lodashjs.com/docs/lodash.throttle)、[_.debounce](https://www.lodashjs.com/docs/lodash.debounce)

## API

### new ScrollTracker(settins)

## Settings
| Attributes | Default | Description | 
| - | - | - |
| [target] | window | 偵聽 scroll 事件的目標 (目前只支援 window 和 window.top) |
| [mode] | 'throttle' | 使用節流模式或防抖模式 'throttle' \| 'debounce' |

**節流模式設定 throttle mode settings**
| Attributes | Default | Description | 
| - | - | - |
| [wait] | 500 | 節流的毫秒數，若低於 100 將強制為 100 |
| [options] |  | 節流模式的 options |
| [options.leading] | true | 指定調用在節流開始前 |
| [options.trailing] | true | 指定調用在節流結束後 |

**防抖模式設定 debounce mode settings**
| Attributes | Default | Description | 
| - | - | - |
| [wait] | 500 | 延遲的毫秒數，若低於 100 將強制為 100 |
| [options] |  | 防抖模式的 options |
| [options.leading] | false | 指定調用在防抖開始前 |
| [options.trailing] | true | 指定調用在防抖結束後 |
| [options.maxWait] | 0 | 允許被延遲的最大值 |

## Extentds
-  EventEmitter

## Members

**target: window**
> 偵聽 scroll 事件的目標。(目前只支援 window 和 window.top)

**settings: Object**
> 同 new ScrollTracker(settins) 傳入的 settins 設定。

**scrollY**
> 捲軸 Y 軸座標。

**deltaY**
> 捲軸 Y 軸座標的瞬間變化量。(與上次畫面更新時相比的變化量，未被 wait 影響。)

**direction**
> 捲動方向。1:向下捲 -1: 向上捲

**scrollHeight**
> 可捲動的高度。

**scrollBarHeight**
> 捲軸 Bar 的高度。

**scrollRatio**
> 捲動畫面的百分比，範圍為 0~1。
## Methods
**track()**
>

**untrack()**
> 

## Events

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
