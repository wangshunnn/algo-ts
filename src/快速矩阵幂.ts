/**
 * 矩阵快速幂
 */

const MOD = BigInt(1e9 + 7)
const L = 26

/**
 * 矩阵类
 */
class Mat {
  public m: bigint[][]

  /** 初始化 _L x L_ 矩阵 */
  constructor(CopyFromMat: Mat | null = null) {
    this.m = Array.from({ length: L }, () => new Array(L).fill(0n))
    if (CopyFromMat) {
      for (let i = 0; i < L; i++) {
        for (let j = 0; j < L; j++) {
          this.m[i][j] = CopyFromMat.m[i][j]
        }
      }
    }
  }

  /**
   * 矩阵乘法
   */
  public mul(other: Mat): Mat {
    const M = new Mat()
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < L; j++) {
        for (let k = 0; k < L; k++) {
          M.m[i][j] += this.m[i][k] * other.m[k][j]
          M.m[i][j] %= MOD
        }
      }
    }
    return M
  }
}

/**
 * 单位矩阵
 */
function I(): Mat {
  const M = new Mat()
  for (let i = 0; i < L; i++) {
    M.m[i][i] = 1n
  }
  return M
}

/**
 * 矩阵快速幂 M^t
 */
function quickMul(M: Mat, t: number): Mat {
  let ans = I()
  let cur = new Mat(M)
  while (t > 0) {
    if (t & 1) {
      ans = ans.mul(cur)
    }
    cur = cur.mul(cur)
    t >>= 1
  }
  return ans
}

/**
 * - [3337. 字符串转换后的长度 II](https://leetcode.cn/problems/total-characters-in-string-after-transformations-ii)
 */
function lengthAfterTransformations(s: string, t: number, nums: number[]): number {
  // 初始化 M
  const M = new Mat()
  for (let i = 0; i < L; i++) {
    for (let j = i + 1; j <= i + nums[i]; j++) {
      M.m[j % L][i] = 1n
    }
  }

  // M^t
  const Mt = quickMul(M, t)

  // 初始化 F
  const F = new Array(L).fill(0n)
  for (const c of s) {
    F[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1n
  }

  let ans = 0n
  // F * M^t
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      ans += F[i] * Mt.m[j][i]
      ans %= MOD
    }
  }
  return Number(ans)
}
