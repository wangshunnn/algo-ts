/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  if (!n) {
    return []
  }

  const res = []

  dfs('', 0, 0, n)

  function dfs(str, l, r, n) {
    if (l === n && r === n) {
      res.push(str)
      return true
    }

    if (r > l || l > n || r > n) {
      return false
    }

    dfs(str + '(', l + 1, r, n)
    dfs(str + ')', l, r + 1, n)
  }

  return res
}
// @lc code=end
