/**
 * 双模即用两个哈希计算方式组合，避免单模可能出现的哈希冲突
 */

function longestCommonSubpath(n: number, paths: number[][]): number {
  const minPathLength = Math.min(...paths.map(path => path.length))
  const minPathIndex = paths.findIndex(p => p.length === minPathLength)
  // O(m*n)
  const hashArray1 = paths.map(path => new StringHash1(path))
  const hashArray2 = paths.map(path => new StringHash2(path))
  const minPathHash1 = hashArray1[minPathIndex]
  const minPathHash2 = hashArray2[minPathIndex]
  let ans = 0

  // O(m*n)
  const check = (len: number): boolean => {
    let baseMemo = new Set<string>()
    for (let i = 0; i <= minPathLength - len; i++) {
      const hash1 = minPathHash1.getSubStrHash(i, i + len - 1)
      const hash2 = minPathHash2.getSubStrHash(i, i + len - 1)
      baseMemo.add(hash1 + '#' + hash2)
    }
    for (let i = 0; i < paths.length; i++) {
      if (i === minPathIndex) {
        continue
      }
      const Hash1 = hashArray1[i]
      const Hash2 = hashArray2[i]
      const nums = paths[i].length
      const newMemo = new Set<string>()
      for (let j = 0; j <= nums - len; j++) {
        const hash1 = Hash1.getSubStrHash(j, j + len - 1)
        const hash2 = Hash2.getSubStrHash(j, j + len - 1)
        if (baseMemo.has(hash1 + '#' + hash2)) {
          newMemo.add(hash1 + '#' + hash2)
        }
      }
      baseMemo = newMemo
      if (baseMemo.size === 0) {
        return false
      }
    }

    ans = len
    return true
  }

  // O(log(min(paths[i].length)))
  let left = 0
  let right = minPathLength // 闭区间 [left, right] 这里要求最大长度，不是下标，所以是 n 而不是 n - 1
  // console.log('-->', left, right)
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    // console.log(mid, check(mid))
    if (check(mid)) {
      left = mid + 1 // 范围缩小到 [mid+1, right]
    } else {
      right = mid - 1 // 范围缩小到 [left, mid-1]
    }
  }

  return ans
}

class StringHash1 {
  private P = 1313131n
  private hash: BigUint64Array // BigUint64Array 溢出自动取模 mod = 2^64，此处数组：
  public prime: BigUint64Array //mod = 2^64，此处数组：溢出自动取模
  // 外面定义的数也要是BigUint64Array!
  constructor(s: number[]) {
    const n = s.length
    this.hash = new BigUint64Array(n + 1)
    this.prime = new BigUint64Array(n + 1)
    this.prime[0] = 1n
    for (let i = 0; i < n; i++) {
      this.prime[i + 1] = this.prime[i] * this.P
      this.hash[i + 1] = this.hash[i] * this.P + BigInt.asUintN(64, BigInt(s[i]))
    }
  }
  // 计算 s[l:r] 子串的哈希值，其中 l, r 表示下标，且 0 <= l <= r < n
  getSubStrHash(l: number, r: number): bigint {
    return BigInt.asUintN(64, this.hash[r + 1] - this.hash[l] * this.prime[r - l + 1])
  }
}

class StringHash2 {
  private P = 1313131n
  private hash: bigint[]
  public prime: bigint[]
  private mode = BigInt(1e9 + 7)
  constructor(s: number[]) {
    const n = s.length
    this.hash = [0n]
    this.prime = [1n]
    for (let i = 0; i < n; i++) {
      this.prime[i + 1] = (this.prime[i] * this.P) % this.mode
      this.hash[i + 1] = (this.hash[i] * this.P + BigInt(s[i])) % this.mode
    }
  }
  // 计算 s[l:r] 子串的哈希值，其中 l, r 表示下标，且 0 <= l <= r < n
  getSubStrHash(l: number, r: number): bigint {
    return BigInt(this.hash[r + 1] - ((this.hash[l] * this.prime[r - l + 1]) % this.mode) + this.mode) % this.mode
  }
}
