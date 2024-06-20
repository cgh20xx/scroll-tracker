# ScrollTracker

這是一個偵測頁面捲軸的套件，可設定偵聽 scroll 事件使用節流或防抖模式，並可計算捲動置、捲軸高度、捲動百分比等資訊。

提供 IIFE 及 ESM 的 js 檔，請至 dist folder 自行選用。

## Usage

```js
// 節流模式設定
const st = new ScrollTracker({
  target: window, // 目前限綁定 window 物件
  mode: 'throttle',
  wait: 500, // 限制最低為 100ms
  options: {
    leading: true, // throttle 專用設定：是否在開始時立即調用
    trailing: false, // throttle 專用設定：是否在結束時調用
  },
});

// 防抖模式設定
// const st = new ScrollTracker({
//   target: window, // 目前限綁定 window 物件
//   mode: 'debounce',
//   wait: 500, // 限制最低為 100ms
//   options: {
//     immediate: true // debounce 專用設定：是否在開始立即調用
//   },
// });

st.on('PROCESSED_SCROLL', function (e) {
  // 偵聽被處理過的 scroll 事件。(throttle | debounce)
  console.log('scrollY:', st.scrollY)
  console.log('deltaY:', st.deltaY)
  console.log('direction:', st.direction)
  console.log('scrollHeight:', st.scrollHeight)
  console.log('scrollBarHeight:', st.scrollBarHeight)
  console.log('scrollRatio:', st.scrollRatio)
});

st.track(); // 開始追蹤捲軸
```

## Demo
- [IIFE Demo](https://cgh20xx.github.io/scroll-tracker/demo/iife.html)
- [ESM Demo](https://cgh20xx.github.io/scroll-tracker/demo/esm.html)

## API

### new ScrollTracker(settings)

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
| [options.immediate] | false | 指定調用在防抖開始前 |

## Extends
-  EventEmitter

## Members

`target`: window

偵聽 scroll 事件的目標。(目前只支援 window 和 window.top)


`settings`: Object

相當於 new ScrollTracker(settings) 傳入的 settings 設定。(含預設值)


`scrollY`: Number

捲軸 Y 軸座標。


`deltaY`: Number

捲軸 Y 軸座標的瞬間變化量。(與上次畫面更新時相比的變化量，未被 wait 影響。)


`direction`: Number

捲動方向。1:向下捲 -1: 向上捲


`scrollHeight`: Number

可捲動的高度。


`scrollBarHeight`: Number

捲軸 Bar 的高度。


`scrollRatio`: Number

捲動畫面的百分比，範圍為 0~1。


`returnFunction`: Function

依 mode 不同，返回對應的節流函式或防抖函式。該函式提供一個 cancel 方法取消延遲的函式調用以及 flush 方法立即調用。

## Methods

`track()`: Void

開始偵聽 scroll 事件。


`untrack()`: Void

移除偵聽 scroll 事件。


## Events

`SCROLL`

偵聽未被處理過的 scroll 事件，同 window.addEventListener('scroll', function (e) {})。


`PROCESSED_SCROLL`

偵聽被處理過的 scroll 事件 (throttle or debounce)


`TRACK`

偵聽當執行 track() 後會被觸發的事件。


`UNTRACK`

偵聽當執行 untrack() 後會被觸發的事件。

---


