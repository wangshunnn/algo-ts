/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // ! 自顶向下 记忆化搜索
  const dp = Array(nums.length).fill(0);

  function dfs(i) {
    if (dp[i]) {
      return dp[i];
    }
    let res = 1;
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        res = Math.max(res, dfs(j) + 1);
      }
    }
    dp[i] = res;
    return res;
  }

  let res = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    res = Math.max(res, dfs(i));
  }
  return res;

  // ! 自底向上 地推
  // const dp = Array(nums.length).fill(1);
  // let res = 1;
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = 0; j < i; j++) {
  //     if (nums[j] < nums[i]) {
  //       dp[i] = Math.max(dp[i], dp[j] + 1);
  //     }
  //   }
  //   res = Math.max(res, dp[i]);
  // }
  // return res;
};
// @lc code=end
