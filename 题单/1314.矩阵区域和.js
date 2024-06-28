/*
 * @lc app=leetcode.cn id=1314 lang=javascript
 *
 * [1314] 矩阵区域和
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, k) {
  const [row, col] = [mat.length, mat[0].length]

  // !! 不能用 Array(row + 1).fill(Array(col + 1).fill(0)) 因为这是引用浅拷贝
  const matSum = Array(row + 1)
    .fill(0)
    .map(() => Array(col + 1).fill(0))

  // 计算前缀和矩阵
  for (let x = 1; x <= row; x++) {
    for (let y = 1; y <= col; y++) {
      matSum[x][y] =
        matSum[x - 1][y] +
        matSum[x][y - 1] -
        matSum[x - 1][y - 1] +
        mat[x - 1][y - 1]
    }
  }

  // 计算目标矩阵
  function subMatSum(x1, y1, x2, y2) {
    return (
      matSum[x2 + 1][y2 + 1] -
      matSum[x1][y2 + 1] -
      matSum[x2 + 1][y1] +
      matSum[x1][y1]
    )
  }

  const resMatSum = Array(row)
    .fill(0)
    .map(() => Array(col).fill(0))

  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      resMatSum[x][y] = subMatSum(
        x - k < 0 ? 0 : x - k,
        y - k < 0 ? 0 : y - k,
        x + k > row - 1 ? row - 1 : x + k,
        y + k > col - 1 ? col - 1 : y + k,
      )
    }
  }

  return resMatSum
}

// @lc code=end
