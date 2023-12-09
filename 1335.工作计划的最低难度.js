/*
 * @lc app=leetcode.cn id=1335 lang=javascript
 *
 * [1335] 工作计划的最低难度
 */

// @lc code=start
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
  const n = jobDifficulty.length;
  if (n < d) {
    return -1;
  }

  const memo = Array(d)
    .fill()
    .map(() => Array(n).fill(-1));

  // i+1 天完成 j 项任务
  function dfs(i, j) {
    if (memo[i][j] !== -1) {
      return memo[i][j];
    }

    if (i === 0) {
      // ! 终止条件: 最后一天
      let max = 0;
      for (let k = 0; k <= j; k++) {
        max = Math.max(max, jobDifficulty[k]);
      }
      return (memo[i][j] = max);
    }

    let res = Infinity;
    let max = 0;
    for (let k = j; k >= i; k--) {
      max = Math.max(max, jobDifficulty[k]);
      res = Math.min(res, max + dfs(i - 1, k - 1));
    }
    return (memo[i][j] = res);
  }

  return dfs(d - 1, n - 1);
};
// @lc code=end
