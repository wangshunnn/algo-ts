/*
 * @lc app=leetcode.cn id=1109 lang=javascript
 *
 * [1109] 航班预订统计
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  const df = new DiffArray(n);
  for (const [f, l, s] of bookings) {
    df.increment(f, l, s);
  }

  return df.getResult();
};

function DiffArray(nums = 0) {
  this.diff = Array(nums).fill(0);
}

DiffArray.prototype.increment = function (first, last, count) {
  this.diff[first - 1] += count;
  last < this.diff.length && (this.diff[last] -= count);
};

DiffArray.prototype.getResult = function () {
  const res = [this.diff[0]];
  for (let index = 1; index < this.diff.length; index++) {
    res[index] = res[index - 1] + this.diff[index];
  }

  return res;
};
// @lc code=end
