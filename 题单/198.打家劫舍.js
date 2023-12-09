/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length;
  const memo = Array(n).fill(-1);

  function dfs(n) {
    if (n < 0) {
      return 0;
    }

    if (memo[n] !== -1) {
      return memo[n];
    }

    return (memo[n] = Math.max(nums[n] + dfs(n - 2), dfs(n - 1)));
  }

  return dfs(n - 1);
};

var rob1 = function (nums) {
  let dp0 = 0,
    dp1 = nums[0];

  for (let i = 1; i < nums.length; i++) {
    let _max = Math.max(dp1, dp0 + nums[i]);
    dp0 = dp1;
    dp1 = _max;
  }

  return dp1;
};
// @lc code=end
