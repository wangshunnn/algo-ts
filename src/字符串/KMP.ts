/**
 * KMP 算法
 * 时间复杂度：O(n + m)，我们至多需要遍历「主串」和「模式串」一次
 * 空间复杂度：O(m)，我们只需要保存「模式串」的前缀函数
 *
 * LeetCode 28. 模板题：实现 strStr()
 * https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 *
 * 算法讲解参考：
 * - https://www.zhihu.com/question/21923021
 */

function strStr(haystack: string | number[], needle: string | number[]) {
  const n = haystack.length
  const m = needle.length

  if (m === 0) {
    return [] // 注意根据题意区分：如果模式串为空，返回位置 0 还是 -1 还是 空数组
  }

  // 计算「模式串」的前缀函数（π 数组，或称 next 数组）
  function getPiFunc(s: string | number[]): number[] {
    const m = s.length
    const pi: number[] = new Array(m).fill(0)
    for (let i = 1, j = 0; i < m; i++) {
      while (j > 0 && s[i] !== s[j]) {
        j = pi[j - 1]
      }
      if (s[i] === s[j]) {
        j++
      }
      pi[i] = j
    }
    return pi
  }

  const pi = getPiFunc(needle)
  const ans = []

  // 「主串」匹配
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = pi[j - 1]
    }
    if (haystack[i] === needle[j]) {
      j++
    }
    if (j === m) {
      // return i - m + 1 // 1. 返回第一个匹配位置
      ans.push(i - m + 1) // 2. 返回所有匹配位置
    }
  }

  return ans // 如果匹配不到，可以自定义返回 -1
}

/**
 * 前缀函数的一种应用场景
 * 计算结束在「主串」 target[i] 位置所能够匹配「模式串」的最长前缀 back[i]
 * 比如：
 * - 主串：aabcdabc
 * - 模式串：abc
 * - 求拼接后的字符串 abc#aabcdabc 的前缀函数
 * - 前缀函数：[0, 0, 0, 0, 1, 1, 2, 3, 0, 1, 2, 3]
 */

function getPrefixFunc(target: string, needle: string) {
  const s = needle + '#' + target
  const n = s.length
  const pi = new Array(n).fill(0)

  for (let i = 1, j = 0; i < n; i++) {
    while (j > 0 && s[i] !== s[j]) {
      j = pi[j - 1]
    }
    if (s[i] === s[j]) {
      j++
    }
    pi[i] = j
  }
  return pi
}
