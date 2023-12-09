/*
 * @lc app=leetcode.cn id=1419 lang=javascript
 *
 * [1419] 数青蛙
 */

// @lc code=start
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
  if (croakOfFrogs.length % 5) {
    return -1;
  }

  const dp = [0, 0, 0, 0, 0];
  const map = {
    c: 0,
    r: 1,
    o: 2,
    a: 3,
    k: 4,
  };

  let res = 0,
    max = 0;

  for (let i of croakOfFrogs) {
    const index = map[i];
    if (index) {
      if (dp[index - 1]) {
        dp[index - 1] -= 1;
        dp[index] += 1;
      } else {
        return -1;
      }

      if (index === 4) {
        res -= 1;
      }
    } else {
      dp[0] += 1;
      res += 1;
      max = max < res ? res : max;
    }
  }

  return res ? -1 : max;
};
// @lc code=end
