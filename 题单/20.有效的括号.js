/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2) {
    return false
  }

  const stack = []
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ])

  for (const ch of s) {
    const _ch = pairs.get(ch)
    if (_ch) {
      // 右括号出栈
      if (_ch !== stack.pop()) {
        return false
      }
    } else {
      // 左括号入栈
      stack.push(ch)
    }
  }

  return !stack.length
}
// @lc code=end
