/*
 * @lc app=leetcode.cn id=2409 lang=javascript
 *
 * [2409] 统计共同度过的日子数
 */

// @lc code=start
/**
 * @param {string} arriveAlice
 * @param {string} leaveAlice
 * @param {string} arriveBob
 * @param {string} leaveBob
 * @return {number}
 */
var countDaysTogether = function (
  arriveAlice,
  leaveAlice,
  arriveBob,
  leaveBob,
) {
  const month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30]
  for (let m = 1; m < 12; m++) {
    month[m] = month[m - 1] + month[m]
  }
  const [am1, ad1] = arriveAlice.split('-')
  const [lm1, ld1] = leaveAlice.split('-')
  const [am2, ad2] = arriveBob.split('-')
  const [lm2, ld2] = leaveBob.split('-')

  const a1 = month[+am1 - 1] + +ad1
  const l1 = month[+lm1 - 1] + +ld1
  const a2 = month[+am2 - 1] + +ad2
  const l2 = month[+lm2 - 1] + +ld2

  if (a1 <= l2 && a2 <= l1) {
    return Math.min(l1, l2) - Math.max(a1, a2) + 1
  } else {
    return 0
  }
}
// @lc code=end
