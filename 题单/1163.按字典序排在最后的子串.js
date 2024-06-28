/*
 * @lc app=leetcode.cn id=1163 lang=javascript
 *
 * [1163] 按字典序排在最后的子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function (s) {
  // ! 双指针 + 后缀子串
  let i = 0,
    j = 1,
    k = 0

  while (j + k < s.length) {
    if (s[i + k] === s[j + k]) {
      k++
    } else if (s[i + k] < s[j + k]) {
      i = i + k + 1
      k = 0
      if (i >= j) {
        j = i + 1
      }
    } else {
      j = j + k + 1
      k = 0
    }
  }

  return s.slice(i)
}
// @lc code=end
