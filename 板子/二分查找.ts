// lowerBound 返回最小的满足 nums[i] >= target 的 i
// 如果数组为空，或者所有数都 < target，则返回 nums.length
// 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]

// 闭区间写法
function lowerBound(nums: number[], target: number) {
  let left = 0,
    right = nums.length - 1 // 闭区间 [left, right]
  while (left <= right) {
    // 区间不为空
    // 循环不变量：
    // nums[left-1] < target
    // nums[right+1] >= target
    const mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid + 1 // 范围缩小到 [mid+1, right]
    } else {
      right = mid - 1 // 范围缩小到 [left, mid-1]
    }
  }
  return left // 或者 right+1
}

// 左闭右开区间写法
function lowerBound2(nums: number[], target: number) {
  let left = 0,
    right = nums.length // 左闭右开区间 [left, right)
  while (left < right) {
    // 区间不为空
    // 循环不变量：
    // nums[left-1] < target
    // nums[right] >= target
    const mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid + 1 // 范围缩小到 [mid+1, right)
    } else {
      right = mid // 范围缩小到 [left, mid)
    }
  }
  return left // 或者 right
}

// 开区间写法
function lowerBound3(nums: number[], target: number) {
  let left = -1,
    right = nums.length // 开区间 (left, right)
  while (left + 1 < right) {
    // 区间不为空
    // 循环不变量：
    // nums[left] < target
    // nums[right] >= target
    const mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid // 范围缩小到 (mid, right)
    } else {
      right = mid // 范围缩小到 (left, mid)
    }
  }
  return right // 或者 left+1
}

var searchRange = function (nums: number[], target: number) {
  const start = lowerBound(nums, target) // 选择其中一种写法即可
  if (start === nums.length || nums[start] !== target) return [-1, -1]
  // 如果 start 存在，那么 end 必定存在
  const end = lowerBound(nums, target + 1) - 1
  return [start, end]
}
