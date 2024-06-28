/*
 * @lc app=leetcode.cn id=1105 lang=javascript
 *
 * [1105] 填充书架
 */

// @lc code=start
/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
// ! 动态规划：记忆化搜索
var minHeightShelves = function (books, shelfWidth) {
  const memo = new Map()

  function dfs(i) {
    if (i < 0) {
      return 0
    }

    if (memo.get(i)) {
      return memo.get(i)
    }

    let w = 0
    let h = 0
    let res = Infinity

    for (let j = i; j >= 0; j--) {
      if (w + books[j][0] > shelfWidth) {
        break
      }
      w += books[j][0]
      h = Math.max(h, books[j][1])
      res = Math.min(res, h + dfs(j - 1))
    }

    memo.set(i, res)
    return res
  }

  return dfs(books.length - 1)
}
// @lc code=end
