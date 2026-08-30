/**
 * 矩阵快速幂
 *
 * - [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)
 * - 时间复杂度：O(log n)（通用 d 阶方阵为 O(d³ log n)）
 * - 空间复杂度：O(1)（通用 d 阶方阵为 O(d²)）
 */
function climbStairs(n: number): number {
  const m = [
    [1, 1],
    [1, 0],
  ]
  const f0 = [[1], [0]]
  const fn = powMul(m, n, f0)
  return fn[0][0]
}

/**
 * 计算 m^n * f0
 */
function powMul(m: number[][], n: number, f0: number[][]): number[][] {
  let res = f0
  while (n > 0) {
    if (n % 2) {
      res = mul(m, res)
    }
    m = mul(m, m)
    n >>= 1
  }
  return res
}

/**
 * 矩阵乘法
 *
 * a: n * k
 * b: k * m
 * a * b: n * m
 */
function mul(a: number[][], b: number[][]): number[][] {
  const n = a.length
  const m = b[0].length
  const c = new Array(n).fill(0).map(() => new Array(m).fill(0))

  for (let i = 0; i < n; i++) {
    for (let k = 0; k < a[i].length; k++) {
      if (a[i][k] === 0) {
        continue
      }
      for (let j = 0; j < m; j++) {
        c[i][j] += a[i][k] * b[k][j]
      }
    }
  }

  return c
}

// -----------------------------------------------------------------------------

/**
 * 迭代解法
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function climbStairsIterative(n: number): number {
  let f0 = 1
  let f1 = 1
  for (let i = 2; i <= n; i++) {
    ;[f0, f1] = [f1, f1 + f0]
  }
  return f1
}
