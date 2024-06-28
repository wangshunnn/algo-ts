/**
 * 数位 dp
 * 灵神题解：https://leetcode.cn/problems/count-special-integers/solutions/1746956/shu-wei-dp-mo-ban-by-endlesscheng-xtgx/
 * * LC 2376 233
 */
function countSpecialNumbers(n: number): number {
  const s = '' + n
  const len = s.length
  const memo = new Array(len + 1).fill(0).map(() => new Array(1 << 10).fill(-1))

  /**
   * LC 2376 数位 DP 板子
   * @param i 填第 i 位
   * @param mask mask 表示前面选过的数字集合，换句话说，第 iii 位要选的数字不能在 mask\textit{mask}mask 中。
   * @param isLimit isLimit 表示当前是否受到了 n 的约束（注意要构造的数字不能超过 n）。若为真，则第 i 位填入的数字至多为 s[i]，否则可以是 9。
   * @param isNum isNum 表示 i 前面的数位是否填了数字。若为假，则当前位可以跳过（不填数字），或者要填入的数字至少为 1；若为真，则要填入的数字可以从 0 开始。
   * @returns
   */
  function dfs(
    i: number,
    mask: number,
    isLimit: boolean,
    isNum: boolean
  ): number {
    if (i === len) {
      return isNum ? 1 : 0
    }

    if (!isLimit && isNum && memo[i][mask] !== -1) {
      return memo[i][mask]
    }

    let res = 0
    if (!isNum) {
      res += dfs(i + 1, mask, false, false)
    }

    const up = isLimit ? +s[i] * 1 : 9
    const down = isNum ? 0 : 1
    for (let j = down; j <= up; j++) {
      if ((1 << j) & mask) {
        continue
      }
      res += dfs(i + 1, mask | (1 << j), isLimit && j === up, true)
    }

    if (!isLimit && isNum) {
      memo[i][mask] = res
    }
    return res
  }

  return dfs(0, 0, true, false)
}
