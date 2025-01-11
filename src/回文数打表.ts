/**
 * 打表 [1, 1eU) 内的回文数（U位数以内）
 * 比如 U = 9, 范围是 [1, 999_999_99]
 * 参考 https://leetcode.cn/problems/minimum-cost-to-make-array-equalindromic/solutions/2569308/yu-chu-li-hui-wen-shu-zhong-wei-shu-tan-7j0zy/
 * LC 100151
 */

function findAllPalindromic(U: number = 1): number[] {
  const ans: number[] = []
  const offset = U >> 1
  let base = 1
  while (base <= 10 ** offset) {
    if (!(!(U & 1) && base === 10 ** offset)) {
      // 奇数回文数
      for (let i = base; i < base * 10; i++) {
        let pal = i
        let pointer = Math.floor(i / 10)
        while (pointer > 0) {
          pal = pal * 10 + (pointer % 10)
          pointer = Math.floor(pointer / 10)
        }
        ans.push(pal)
      }
    }
    if (base <= 10 ** (offset - 1)) {
      // 偶数回文数
      for (let i = base; i < base * 10; i++) {
        let pal = i
        let pointer = i

        while (pointer > 0) {
          pal = pal * 10 + (pointer % 10)
          pointer = Math.floor(pointer / 10)
        }
        ans.push(pal)
      }
    }
    base *= 10
  }
  // 如果想添加 1eU+1 (U+1位数的最小回文数, 比如U=3, 1eU+1=1001), 可解注释
  // ans.push(10 ** U + 1)
  return ans
}

const pals = findAllPalindromic(3)
console.log(JSON.stringify(pals), pals.length, pals[pals.length - 1])

const pals1 = findAllPalindromic(2)
console.log(JSON.stringify(pals1), pals1.length, pals1[pals1.length - 1])
