import { bitCount32 } from '../util'

/**
 * * 状压基础（相邻无关）
 * LC 256: https://leetcode.cn/problems/beautiful-arrangement/
 */
function countArrangement(n: number): number {
  const memo = Array(1 << n).fill(-1) // -1 表示没有计算过
  function dfs(s: number) {
    if (s === (1 << n) - 1) {
      return 1
    }
    if (memo[s] !== -1) {
      return memo[s]
    }

    let res = 0
    const i = bitCount32(s) + 1

    for (let j = 1; j <= n; j++) {
      if (((s >> (j - 1)) & 1) === 0 && (i % j === 0 || j % i === 0)) {
        res += dfs(s | (1 << (j - 1)))
      }
    }
    memo[s] = res // 记忆化
    return res
  }

  // 位运算仅支持 32 位
  function bitCount32(n: number) {
    let ans = 0
    while (n) {
      n &= n - 1 // 清除最低位的1
      ans++
    }
    return ans
  }

  // 字符串不限 32 位
  function bitCount(num: number) {
    return [...num.toString(2)].filter(Number).length
  }

  return dfs(0)
}

/**
 * * 状压进阶（相邻相关）
 * LC 2741: https://leetcode.cn/problems/special-permutations/
 */
function specialPerm(nums: number[]): number {
  const mod: number = 1e9 + 7
  const n: number = nums.length
  const f: number[][] = new Array(1 << n).fill([]).map(() => new Array(n).fill(-1))

  const dfs = (state: number, i: number): number => {
    if (f[state][i] !== -1) {
      return f[state][i]
    }
    if (state === 1 << i) {
      return 1
    }
    f[state][i] = 0
    for (let j = 0; j < n; j++) {
      if (i === j || !((state >> j) & 1)) {
        continue
      }
      if (nums[i] % nums[j] !== 0 && nums[j] % nums[i] !== 0) {
        continue
      }
      f[state][i] = (f[state][i] + dfs(state ^ (1 << i), j)) % mod
    }
    return f[state][i]
  }

  let res: number = 0
  for (let i = 0; i < n; i++) {
    res = (res + dfs((1 << n) - 1, i)) % mod
  }
  return res
}
console.log('[shun]')
