/**
 * 马拉车算法
 *
 * 总结思想：和 KMP、Z 函数 其实都是利用前面遍历时的先验信息，来减枝降低时间复杂度
 *
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(n)
 */

function longestPalindrome(s: string): string {
  s = '#' + [...s].join('#') + '#'
  let start = 0,
    end = 1
  let right = -1
  let j = -1
  const f: number[] = []

  for (let i = 0; i < s.length; i++) {
    let curArmLen: number
    if (i <= right) {
      // 左侧的对称点，中心点 j，右侧 i, 所以左侧是 j-(i-j)=2*j-i
      const id = 2 * j - i
      // f[id]: 左侧对称点的回文半径
      const armLen = Math.min(f[id], right - i)
      curArmLen = expand(s, i - armLen, i + armLen)
    } else {
      curArmLen = expand(s, i, i)
    }
    f.push(curArmLen)
    if (i + curArmLen > right) {
      j = i
      right = i + curArmLen
    }
    if (2 * curArmLen + 1 > end - start) {
      start = i - curArmLen + 1
      end = i + curArmLen
    }
  }

  function expand(s: string, i: number, j: number): number {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      i--
      j++
    }
    return Math.floor((j - i) / 2) - 1
  }

  return [...s]
    .slice(start, end)
    .filter(v => v !== '#')
    .join('')
}
