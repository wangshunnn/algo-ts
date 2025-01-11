/**
 * 分组循环模板：
//   let i = 0
//   while (i < n) {
//     let start = i
//     while (i < n && ..) {
//         ..
//         i++
//     }
//     [start, i-1] 是一组
//     [i, ..] 下一组
//   }
 */
function canSortArray(nums: number[]): boolean {
  const n = nums.length
  const cnt = nums.map(num => [...num.toString(2)].filter(Number).length)

  let max_last = 0
  let i = 0
  while (i < n) {
    let max = nums[i]
    const k = cnt[i]
    while (i < n && cnt[i] === k) {
      if (nums[i] < max_last) {
        return false
      }
      max = Math.max(max, nums[i])
      i++
    }
    max_last = max
  }

  return true
}
