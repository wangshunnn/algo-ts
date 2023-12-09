/*
 * @lc app=leetcode.cn id=1043 lang=javascript
 *
 * [1043] 分隔数组以得到最大和
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
  // ! 动态规划
  const dp = Array(arr.length + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    // 局部最大值
    let _max = arr[i];
    // 第 i 个数有 k 种划分，取最大值
    for (let j = 1; j <= k; j++) {
      if (i - j + 1 < 0) {
        break;
      }
      _max = Math.max(_max, arr[i - j + 1]);
      dp[i + 1] = Math.max(dp[i + 1], dp[i - j + 1] + _max * j);
    }
  }

  return dp[arr.length];
};
// @lc code=end
