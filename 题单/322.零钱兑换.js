/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // ! 记忆化搜索 dfs （带备忘录的递归）
  // let memo = Array(amount + 1).fill(undefined);

  // function dfs(coins, amount) {
  //   if (!amount) {
  //     return 0;
  //   }

  //   if (amount < 0) {
  //     return -1;
  //   }

  //   if (memo[amount]) {
  //     return memo[amount];
  //   }

  //   let res = Infinity;

  //   // 计算子问题
  //   for (const coin of coins) {
  //     let sub = dfs(coins, amount - coin);

  //     if (sub === -1) {
  //       continue;
  //     }

  //     res = Math.min(res, sub + 1);
  //   }

  //   return (memo[amount] = res === Infinity ? -1 : res);
  // }

  // return dfs(coins, amount);

  // ! dp 数组迭代 递归->递推
  // ! 此题和记忆化搜索的复杂度一致，时间复杂度 O(K*N)，空间复杂度O(N)
  const dp = Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin < 0) {
        continue
      }
      dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
}
// @lc code=end
