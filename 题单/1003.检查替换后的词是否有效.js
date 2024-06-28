/*
 * @lc app=leetcode.cn id=1003 lang=javascript
 *
 * [1003] 检查替换后的词是否有效
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// ! 栈结构-栈顶匹配（类似括号匹配）
var isValid = function (s) {
  const stk = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    stk.push(c)
    if (stk.length >= 3 && stk.slice(stk.length - 3).join('') === 'abc') {
      stk.splice(stk.length - 3, 3)
    }
  }
  return stk.length === 0
}
// ! 递归-JS 的替换语法
// var isValid = function (s) {
//   if (s.length % 3) {
//     return false;
//   }

//   function dfs(str = "") {
//     if (str.includes("abc")) {
//       return dfs(str.replace("abc", ""));
//     } else {
//       return str ? false : true;
//     }
//   }

//   return dfs(s);
// };
// @lc code=end
