/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let sum = nums.reduce((pre, cur) => pre + cur, 0)

  if (sum % 2 !== 0) {
    return false
  }

  sum /= 2
  const n = nums.length
  let dp = new Array(n + 1)
    .fill(false)
    .map(() => new Array(sum + 1).fill(false))

  for (let i = 0; i <= n; i++) {
    dp[i][0] = true
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= sum; j++) {
      if (j - nums[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[n][sum]
}
// @lc code=end
