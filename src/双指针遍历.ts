/**
 * 双指针遍历模板
 *
 * 常见场景：
 * 1. 左右相向 left/right：有序数组、两数之和、三数之和、回文判断。
 * 2. 同向双指针 left/right：滑动窗口、连续子数组或子串。
 * 3. 快慢指针 slow/fast：原地修改数组、删除元素、链表问题。
 */

// 1. 左右相向：根据当前结果排除一侧区间
function twoSum(nums: number[], target: number): [number, number] | null {
  let left = 0
  let right = nums.length - 1

  // 如果允许两个指针落在同一个位置，改为 left <= right
  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === target) {
      return [left, right]
    }
    if (sum < target) {
      left++
    } else {
      right--
    }
  }

  return null
}

/**
 * 2. 同向双指针：right 扩大窗口，left 缩小窗口
 * 力扣 [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
 */
function lengthOfLongestSubstring(s: string): number {
  const win = new Set<string>()
  let ans = 0
  let left = 0

  for (let right = 0; right < s.length; right++) {
    // s[right] 进入窗口前，先移除窗口中的重复字符
    while (win.has(s[right])) {
      win.delete(s[left])
      left++
    }

    win.add(s[right])
    ans = Math.max(ans, right - left + 1)
  }

  return ans
}

// 3. 快慢指针：fast 遍历数组，slow 维护已处理区间
function removeElement(nums: number[], val: number): number {
  let slow = 0

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }
  }

  return slow
}
