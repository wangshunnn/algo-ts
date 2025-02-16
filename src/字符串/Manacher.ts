/**
 * 马拉车算法
 *
 * 总结思想：和 KMP、Z 函数 其实都是利用前面遍历时的先验信息，来减枝降低时间复杂度
 *
 * - 1. 返回填充 # 特殊字符后每个位置为中心点的回文半径
 * - 2. 返回最长回文字串（长度）
 * - 3. 其他变形场景应用
 *
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(n)
 */

function longestPalindrome(s: string) {
  s = '#' + [...s].join('#') + '#'
  // let start = 0
  // let end = 1
  let right = -1
  let j = -1
  const f: number[] = []

  // 最长回文字串长度的前缀数组（后缀数组将 s 反转再马拉车即可）
  // const pre: number[] = new Array(s.length).fill(0)

  for (let i = 0; i < s.length; i++) {
    let curArmLen: number
    if (i <= right) {
      // 左侧的对称点 id，当前最长的中心点 j，右侧 i, 所以左侧是 j-(i-j)=2*j-i
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
    // 更新最长回文字串长度，如果不需要可以去掉
    // if (2 * curArmLen + 1 > end - start) {
    //   start = i - curArmLen + 1
    //   end = i + curArmLen
    // }
  }

  function expand(s: string, i: number, j: number): number {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      // pre[j] = Math.max(pre[j], pre[j - 1] || 0, j - i + 1)
      i--
      j++
    }
    return ((j - i) >> 1) - 1
  }

  // 返回每个中心点的回文半径（不包含中心，注意包含 '#'）
  // f[i] >> 1 表示原字符串中的半径，注意奇偶数的中心点差异

  return f
  // 返回最长回文字串长度，如果不需要可以去掉
  // return [...s]
  //   .slice(start, end)
  //   .filter(v => v !== '#')
  //   .join('')
}

/**
 * 常用场景：判断原字符串 s 中下标 [l, r] 的子字符串是否是回文串
 */

// 提前计算好 f 数组
const s = '..'
const f = longestPalindrome(s)

function isPalindrome(l: number, r: number) {
  // [l, r] 对应插入 # 之后子符串的中心点 l+r+1
  const center = l + r + 1 // r-l
  // [l, r] 对应插入 # 之后子字符串的半径长度
  const arm = r - l
  if (f[center] >= arm) {
    return true
  }
  return false
}
