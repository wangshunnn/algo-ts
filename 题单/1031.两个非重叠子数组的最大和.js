/*
 * @lc app=leetcode.cn id=1031 lang=javascript
 *
 * [1031] 两个非重叠子数组的最大和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 *
// ! 前缀和数组
var maxSumTwoNoOverlap = function (nums, firstLen, secondLen) {
  const prefixSum = Array(nums.length + 1).fill(0);

  for (let i = 1; i < nums.length + 1; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
  }

  function dfs(nums, firstLen, secondLen) {
    let maxSum = 0,
      fSum = 0;
    for (let i = firstLen + secondLen; i <= nums.length; i++) {
      fSum = Math.max(
        fSum,
        prefixSum[i - secondLen] - prefixSum[i - firstLen - secondLen]
      );
      maxSum = Math.max(maxSum, fSum + prefixSum[i] - prefixSum[i - secondLen]);
    }
    return maxSum;
  }

  return Math.max(
    dfs(nums, firstLen, secondLen),
    dfs(nums, secondLen, firstLen)
  );
};
// @lc code=end
