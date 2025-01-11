/**
 * Z 函数（扩展 KMP）
 * O(n) 时间复杂度，线性遍历
 * https://oi-wiki.org/string/z-func/
 */

function zFunction(s: string): number[] {
  const n = s.length
  const z: number[] = new Array(n).fill(0)
  let l = 0
  let r = 0

  for (let i = 1; i < n; i++) {
    z[i] = Math.max(Math.min(z[i - l], r - i + 1), 0)
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      l = i
      r = i + z[i]
      z[i]++
    }
  }

  return z
}
