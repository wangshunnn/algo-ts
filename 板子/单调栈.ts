/**
 * 单调栈
 * 及时去掉无用数据，保证栈中数据有序。
 * LC 790 42 1475 901 1019 84
 * 灵神视频讲解：https://www.bilibili.com/video/BV1VN411J7S7/
 * 
 * 1. 变形：双单调, LC 2454(hard)
 */

// 从左到右遍历做法
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
        let tmp: number[] = []
        while (s.length > 0 && nums[s[s.length - 1]] < x) {
            tmp.push(s.pop()!)
        }
        t.push(...tmp.reverse())
        s.push(i)
    }
    return ans
}