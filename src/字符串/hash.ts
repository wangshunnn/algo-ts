/**
 * 字符串哈希
 * 时间复杂度：O(n)
 * 空间复杂度：O(1) or O(n)
 *
 * 小技巧
 * s.charCodeAt(i) & 31 表示第 i 个字符相对于 'a' 的偏移量，
 * 比如 'a'.charCodeAt(0) & 31 = 0, 'b'.charCodeAt(0) & 31 = 1, 'c'.charCodeAt(0) & 31 = 2
 * 这样可以将字符串转换为数字，从而可以使用哈希表进行查找
 */

/**
 * 场景一：字符串匹配（下面代码是首次出现位置），KMP 也可以实现
 */

function strStrHash(haystack: string, needle: string): number {
  const n = haystack.length
  const m = needle.length
  if (m === 0) return 0 // 题目约定空字符串返回 0
  if (n < m) return -1

  const base = 256 // 字符范围基数（ASCII 范围）
  const mod = 2 ** 32 // 大质数减少哈希冲突

  // 计算 base^(m-1) mod mod，用于滚动哈希
  let power = 1
  for (let i = 0; i < m - 1; i++) {
    power = (power * base) % mod
  }

  // 计算 needle 的哈希值
  let needleHash = 0
  for (let i = 0; i < m; i++) {
    needleHash = (needleHash * base + needle.charCodeAt(i)) % mod
  }

  // 计算 haystack 初始窗口的哈希值
  let windowHash = 0
  for (let i = 0; i < m; i++) {
    windowHash = (windowHash * base + haystack.charCodeAt(i)) % mod
  }

  // 检查初始窗口是否匹配
  if (windowHash === needleHash && haystack.startsWith(needle)) {
    return 0
  }

  // 滑动窗口，逐步更新哈希值
  for (let i = 1; i <= n - m; i++) {
    // 移除前一个字符的贡献
    const prevChar = haystack.charCodeAt(i - 1)
    windowHash = (windowHash - ((prevChar * power) % mod) + mod) % mod

    // 添加新字符的贡献
    const newChar = haystack.charCodeAt(i + m - 1)
    windowHash = (windowHash * base + newChar) % mod

    // 哈希匹配时，二次检查字符串是否相等（避免哈希冲突）
    if (windowHash === needleHash && haystack.substring(i, i + m) === needle) {
      return i
    }
  }

  return -1
}

/**
 * 找到重复次数最多且长度为 m 的所有子串（或者只求次数，大同小异）
 */

function findRepeatedDnaSequences(s: string): string[] {
  const n = s.length
  const m = 10
  if (n <= m) return []

  const res: Set<number> = new Set()

  const base = 26 // 字符范围基数（ASCII 范围）
  const mod = 2 ** 32 // 大质数减少哈希冲突

  // 计算 base^(m-1) mod mod，用于滚动哈希
  let power = 1
  for (let i = 0; i < m - 1; i++) {
    power = (power * base) % mod
  }

  // 计算 s 初始窗口的哈希值
  let windowHash = 0
  for (let i = 0; i < m; i++) {
    windowHash = (windowHash * base + s.charCodeAt(i)) % mod
  }

  res.add(windowHash)

  const ans: Set<string> = new Set()

  // 滑动窗口，逐步更新哈希值
  for (let i = 1; i <= n - m; i++) {
    // 移除前一个字符的贡献
    const prevChar = s.charCodeAt(i - 1)
    windowHash = (windowHash - ((prevChar * power) % mod) + mod) % mod

    // 添加新字符的贡献
    const newChar = s.charCodeAt(i + m - 1)
    windowHash = (windowHash * base + newChar) % mod

    // 哈希匹配时，二次检查字符串是否相等（避免哈希冲突）
    if (res.has(windowHash)) {
      ans.add(s.substring(i, i + m))
    }

    res.add(windowHash)
  }

  return Array.from(ans)
}
