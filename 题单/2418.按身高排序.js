/*
 * @lc app=leetcode.cn id=2418 lang=javascript
 *
 * [2418] 按身高排序
 */

// @lc code=start
/**
 * @param {string[]} names
 * @param {number[]} heights
 * @return {string[]}
 */
var sortPeople = function (names, heights) {
  const a = [...Array(names.length).keys()]
  return a.sort((a, b) => heights[b] - heights[a]).map(v => names[v])
}
// @lc code=end

// ! 防抖
var debounce = function (fn, t) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, t)
  }
}

// ! 节流：时间戳-首触发
var throttle = function (fn, t) {
  let last = 0
  return function (...args) {
    let now = Date.now()
    // ! remaining > wait 修改了系统时间的情况
    let remaining = t - (now - last)
    if (remaining < 0 || remaining > t) {
      func.apply(this, args)
      last = now
    }
  }
}

// ! 节流：定时器-尾触发
var throttle = function (fn, t) {
  let timer = null

  return function (...args) {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    })
  }
}

// !  节流：时间戳 + 定时器
var throttle = function (fn, t, leading = true, trailing = true) {
  let last = 0
  let isLeading = true
  let timer = null

  return function (...args) {
    let now = Date.now()

    if (!leading && isLeading) {
      // 非首触发
      last = now
      isLeading = false
    }

    let remaining = t - (now - last)
    if (remaining < 0 || remaining > t) {
      fn.apply(this, args)
      last = now
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    } else if (trailing && !timer) {
      // 尾触发
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        last = leading ? 0 : Date.now()
      }, remaining) // 尾触发也符合时间间隔。
    }
  }
}
