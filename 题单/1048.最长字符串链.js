/*
 * @lc app=leetcode.cn id=1048 lang=javascript
 *
 * [1048] 最长字符串链
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  const cnt = new Map()
  words.sort((a, b) => a.length - b.length)
  let res = 0

  for (const word of words) {
    cnt.set(word, 1)
    for (let i = 0; i < word.length; i++) {
      const prev = word.substring(0, i) + word.substring(i + 1)
      if (cnt.has(prev)) {
        cnt.set(word, Math.max(cnt.get(word), cnt.get(prev) + 1))
      }
    }
    res = Math.max(res, cnt.get(word))
  }

  return res
}
// var longestStrChain = function (words) {
//   // ! 动态规划 选或不选

//   const sortWords = words.sort((a, b) => a.length - b.length);

//   let maxLen = 1;
//   // ! sortWords 中以 sortWords[i] 结尾的单词链的长度
//   const dp = Array(words.length).fill(1);

//   for (let i = 0; i < words.length; i++) {
//     for (let j = i - 1; j >= 0; j--) {
//       if ((sortWords[i].length === sortWords[j].length)) {
//         continue;
//       }

//       if (sortWords[i].length - sortWords[j].length > 1) {
//         break;
//       }

//       if (canReplace(sortWords[j], sortWords[i])) {
//         dp[i] = Math.max(dp[i], dp[j] + 1);
//       }

//     }
//     maxLen = Math.max(maxLen, dp[i]);
//   }

//   return maxLen;
// };

// function canReplace(a = "", b = "") {
//   for (let i = 0; i < b.length; i++) {
//     if (b.slice(0, i) + b.slice(i + 1) === a) {
//       return true;
//     }
//   }
//   return false;
// }
// @lc code=end
