/*
 * @lc app=leetcode.cn id=2106 lang=javascript
 *
 * [2106] 摘水果
 */

// @lc code=start
/**
 * @param {number[][]} fruits
 * @param {number} startPos
 * @param {number} k
 * @return {number}
 */
// ! 滑动窗口
var maxTotalFruits = function (fruits, startPos, k) {
  let left = 0
  let right = 0
  const n = fruits.length
  let sum = 0
  let ans = 0
  // 每次固定住窗口右边界
  while (right < n) {
    sum += fruits[right][1]
    // 移动左边界
    while (left <= right && step(fruits, startPos, left, right) > k) {
      sum -= fruits[left][1]
      left++
    }
    ans = Math.max(ans, sum)
    right++
  }
  return ans
}

const step = (fruits, startPos, left, right) => {
  return (
    Math.min(
      Math.abs(startPos - fruits[right][0]),
      Math.abs(startPos - fruits[left][0]),
    ) +
    fruits[right][0] -
    fruits[left][0]
  )
}

// @lc code=end
