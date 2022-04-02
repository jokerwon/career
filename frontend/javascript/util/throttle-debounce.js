/** 
 * 节流函数
 */
function throttle(fn, interval) {
  // last 为上一次触发回调的时间
  let last = 0

  return function () {
    // 保留调用时的上下文
    let context = this
    // 保留调用时传进来的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()  // + 转时间戳

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * 防抖函数
 */
function debounce(fn, delay) {
  let timer = null

  return function () {
    // 保留调用时的上下文
    let context = this
    // 保留调用时传进来的参数
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 加强版节流
 */
function throttleBetter(fn, delay) {
  let last = 0, timer = null

  return function () {
    // 保留调用时的上下文
    let context = this
    // 保留调用时传进来的参数
    let args = arguments

    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      fn.apply(context, args)
    }
  }
} 