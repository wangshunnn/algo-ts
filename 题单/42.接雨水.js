/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  var left = 0,
    right = height.length - 1
  var l_max = 0,
    r_max = 0

  var res = 0
  while (left < right) {
    l_max = Math.max(l_max, height[left])
    r_max = Math.max(r_max, height[right])

    // res += min(l_max, r_max) - height[i]
    if (l_max < r_max) {
      res += l_max - height[left]
      left++
    } else {
      res += r_max - height[right]
      right--
    }
  }
  return res
}

// @lc code=end
