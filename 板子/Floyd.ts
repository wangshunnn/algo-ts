/**
 * * Floyd 最短路算法
 *
 * * 时间复杂度：O(n^3)
 * * 空间复杂度：O(n^2)
 *
 * * 灵神讲解：https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/solutions/2525946/dai-ni-fa-ming-floyd-suan-fa-cong-ji-yi-m8s51/
 * * 动态规划推演而来（中间的编号为 k 的节点选或不选）
 * * 翻译递推后核心就是三重循环，优雅，实在太优雅了！
 *
 */
function Floyd(n: number, edges: number[][]): number[][] {
  const w = Array(n)
    .fill(null)
    .map(() => Array(n).fill(Infinity))
  for (const [x, y, wt] of edges) {
    w[x][y] = w[y][x] = wt
  }

  const f = w
  // ! 先循环 k
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        f[i][j] = Math.min(f[i][j], f[i][k] + f[k][j])
      }
    }
  }

  return f
}

/**
 * 应用题
 *  * LC 1334
 */
function findTheCity(
  n: number,
  edges: number[][],
  distanceThreshold: number,
): number {
  // Floyd 求最短路
  const f = Floyd(n, edges)

  let ans = 0
  let minCnt = n
  for (let i = 0; i < n; i++) {
    let cnt = 0
    for (let j = 0; j < n; j++) {
      if (j !== i && f[i][j] <= distanceThreshold) {
        cnt++
      }
    }
    if (cnt <= minCnt) {
      minCnt = cnt
      ans = i
    }
  }
  return ans
}
