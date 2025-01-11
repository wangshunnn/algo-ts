// 最大公约数（Greatest Common Divisor, GCD）
// 辗转相除法（欧几里得算法）

// 递归
function gcd1(a: number, b: number): number {
  if (b === 0) {
    return a
  } else {
    return gcd1(b, a % b)
  }
}

function gcd2(a: number, b: number): number {
  return b ? gcd2(b, a % b) : a
}

// 迭代
function gcd(a: number, b: number): number {
  while (b !== 0) {
    ;[a, b] = [b, a % b]
  }
  return a
}
