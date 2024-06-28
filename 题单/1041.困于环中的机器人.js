/*
 * @lc app=leetcode.cn id=1041 lang=javascript
 *
 * [1041] 困于环中的机器人
 */

// @lc code=start
/**
 * @param {string} instructions
 * @return {boolean}
 */
var isRobotBounded = function (instructions) {
  const map = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  let target = 0
  let pos = [0, 0]

  for (let index = 0; index < instructions.length; index++) {
    const element = instructions[index]
    switch (element) {
      case 'G':
        let [x, y] = pos
        let [dx, dy] = map[target]
        pos = [x + dx, y + dy]
        break
      case 'L':
        target = (target + 3) % 4
        break
      case 'R':
        target = (target + 1) % 4
        break
    }
  }

  if ((pos[0] === 0 && pos[1] === 0) || target !== 0) {
    return true
  }

  return false
}
// @lc code=end
