/**
 * LCP 数组: 字符串自身的最长公共前缀数组
 * 返回一个二维数组，表示每个位置的最长公共前缀
 * LCP[i][j] 表示 s[i:] 和 s[j:] 的最长公共前缀长度
 * 比如：
 * - 字符串：aabcdabc
 * - LCP[0][0] = 0
 * - LCP[0][1] = 1
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n^2)
 *
 * 求自身的 LCP 也可以用 Z 函数数组, 时间复杂度一样 O(n^2)
 * 但 Z 函数一般用于字符串匹配，而且 LCP 数组写起来更方便
 */

const lcp = (s: string | number[]): number[][] => {
  const n = s.length
  const lcp: number[][] = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (s[i] === s[j]) {
        lcp[i][j] = 1 + lcp[i + 1][j + 1]
      }
    }
  }

  return lcp
}

function beautifulSplits(nums: number[]): number {
  const n = nums.length
  const lcp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (nums[i] === nums[j]) {
        lcp[i][j] = 1 + lcp[i + 1][j + 1]
      }
    }
  }

  console.log(lcp)

  let ans = 0

  // [0, i-1]
  // [i, j-1]
  // [j, n-1]
  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 除了 LCP 满足，还要满足数组长度要求
      if ((lcp[0][i] >= i && j - i >= i) || (lcp[i][j] >= j - i && n - j >= j - i)) {
        ans++
      }
    }
  }

  return ans
}
