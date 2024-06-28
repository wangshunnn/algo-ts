/*
 * @lc app=leetcode.cn id=1187 lang=javascript
 *
 * [1187] 使数组严格递增
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
function makeArrayIncreasing(arr1, arr2) {
  arr2.sort((a, b) => a - b)

  let m = 0
  for (const x of arr2) {
    if (m === 0 || x !== arr2[m - 1]) {
      arr2[m++] = x
    }
  }

  arr2 = arr2.slice(0, m)
  const inf = 1 << 30
  arr1 = [-inf, ...arr1, inf]
  const n = arr1.length
  const f = new Array(n).fill(inf)
  f[0] = 0

  // ! 二分搜索 左闭右开写法
  // https://www.bilibili.com/video/BV1AP41137w7/?spm_id_from=333.999.0.0&vd_source=f64deea97a752c2e9af364fdbc20c78f
  const search = (arr, target) => {
    let l = 0
    let r = arr.length
    while (l < r) {
      const mid = (l + r) >> 1
      if (arr[mid] < target) {
        l = mid + 1
      } else {
        r = mid
      }
    }
    return l
  }

  // 类似背包问题
  for (let i = 1; i < n; ++i) {
    if (arr1[i - 1] < arr1[i]) {
      f[i] = f[i - 1]
    }
    const j = search(arr2, arr1[i])
    for (let k = 1; k <= Math.min(i - 1, j); ++k) {
      if (arr1[i - k - 1] < arr2[j - k]) {
        f[i] = Math.min(f[i], f[i - k - 1] + k)
      }
    }
  }

  return f[n - 1] >= inf ? -1 : f[n - 1]
}
// @lc code=end
