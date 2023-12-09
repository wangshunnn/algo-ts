/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// ! 滑动窗口 时间复杂度 n2，再加上判断回文，n3，不如中心扩散快
// var longestPalindrome = function (s) {
//   // 遍历所有子串，从最长子串开始
//   for (let index = s.length; index > 0; index--) {
//     let l = 0,
//       r = index - 1;

//     while (r < s.length) {
//       let sub = s.slice(l, r + 1);
//       if (isPalindrome(sub)) {
//         return sub;
//       }
//       l++, r++;
//     }
//   }

//   return s;
// };

// // 检查子串是否是回文
// function isPalindrome(str = "") {
//   let l = 0,
//     r = str.length - 1;

//   while (l < r) {
//     if (str.charAt(l) !== str.charAt(r)) {
//       return false;
//     }
//     l++, r--;
//   }
//   return true;
// }

// ! 中心扩散时间复杂度 n2
var longestPalindrome = function (s) {
  let res = "";
  for (let i = 0; i < s.length; i++) {
    // 剪枝：扩散的最大长度不可能超过已得到的最长回文子串
    if (res && Math.min(i + 1, s.length - i - 1) * 2 < res.length) {
      continue;
    }

    // 以 s[i] 为中心的最长回文子串
    const oddSub = palindrome(s, i, i);
    // res = longest(res, s1, s2)
    const evenSub = palindrome(s, i, i + 1);

    // 比较长度lllllllllllllllllllllllllllllllllllllo
    res = res.length >= oddSub.length ? res : oddSub;
    res = res.length >= evenSub.length ? res : evenSub;
  }
  return res;
};

function palindrome(s = "", left, right) {
  while (left >= 0 && right < s.length && s[left] == s[right]) {
    left--;
    right++;
  }
  return s.slice(left + 1, right);
}
// @lc code=end
