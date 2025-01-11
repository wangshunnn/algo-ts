/**
 * 单调栈
 * 及时去掉无用数据，保证栈中数据有序。
 * LC 790 42 1475 901 1019 84
 * 灵神视频讲解：https://www.bilibili.com/video/BV1VN411J7S7/
 */

/**
 * [2454. 下一个更大元素 IV-(hard)](https://leetcode.cn/problems/next-greater-element-iv/description/)
 * 两次单调栈
 */
function secondGreaterElement(nums: number[]): number[] {
  const n = nums.length
  const ans: number[] = new Array(n).fill(-1)
  const s: number[] = [] // 第一个单调栈，正常记录
  const t: number[] = [] // 第二个单调栈，保存s中弹出的数
  // 从左到右遍历
  for (let i = 0; i < n; i++) {
    const x = nums[i]
    while (t.length > 0 && nums[t[t.length - 1]] < x) {
      // t 栈顶小于 x
      const idx = t.pop()
      ans[idx!] = x
    }
    const tmp: number[] = []
    while (s.length > 0 && nums[s[s.length - 1]] < x) {
      tmp.push(s.pop()!)
    }
    t.push(...tmp.reverse())
    s.push(i)
  }
  return ans
}

/**
 * LC [2866. 美丽塔 II (middle)](https://leetcode.cn/problems/beautiful-towers-ii/description/)
 * 前后缀分解+单调栈
 */
function maximumSumOfHeights(maxHeights: number[]): number {
  const n = maxHeights.length
  // 第一次左到右遍历，寻找山峰左侧递增的单调栈，更新前缀和
  let st: number[] = []
  const preSum: number[] = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    const h = maxHeights[i]
    while (st.length > 0 && maxHeights[st[st.length - 1]] > h) {
      st.pop()
    }
    if (st.length === 0) {
      preSum[i] = (i + 1) * h
    } else {
      const peak = st[st.length - 1]
      preSum[i] = preSum[peak] + (i - peak) * h
    }
    st.push(i)
  }
  // 第二次右到左遍历，寻找山峰右侧递减的单调栈，更新后缀和
  st = []
  const sufSum: number[] = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    const h = maxHeights[i]
    while (st.length > 0 && maxHeights[st[st.length - 1]] > h) {
      st.pop()
    }
    if (st.length === 0) {
      sufSum[i] = (n - i) * h
    } else {
      const peak = st[st.length - 1]
      sufSum[i] = sufSum[peak] + (peak - i) * h
    }
    st.push(i)
  }
  let ans = 0
  // 最终再遍历一次查询最大结果，也可以把这次循环和上一次合并起来
  for (let i = 0; i < n; i++) {
    const res = preSum[i] + sufSum[i] - maxHeights[i]
    ans = Math.max(ans, res)
  }
  return ans
}
