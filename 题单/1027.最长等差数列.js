/*
 * @lc app=leetcode.cn id=1027 lang=javascript
 *
 * [1027] 最长等差数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// ! dp数组 动态规划：带哈希表的记忆化搜索
var longestArithSeqLength = function (nums) {
  let dp = new Array(nums.length).fill().map(() => new Map());
  let res = 0;

  for (let i = 0; i < nums.length; i++) {
    // dp[i] 表示以第i项结尾的所有可能的等差序列的键值Map（diff差值, 序列长度）
    // dp[i][diff] 表示以 nums[i] 结尾，公差为 diff 的最长等差子序列的长度
    for (let j = 0; j < i; j++) {
      // 计算等差
      let diff = nums[i] - nums[j];
      // 默认左侧不存在此 diff 的序列，则长度则为 2（此时只有nums[i]、nums[j]两个）
      let diffLen = 2;
      // ! 注意这里下标是 j 不是 i
      if (dp[j].get(diff)) {
        // 如果左侧已经存在此 diff 的等差序列，则长度 +1
        diffLen = dp[j].get(diff) + 1;
      }
      // ! 注意这里下标是 i 不是 j
      dp[i].set(diff, diffLen);
      res = Math.max(res, diffLen);
    }
  }

  return res;
};
// @lc code=end
