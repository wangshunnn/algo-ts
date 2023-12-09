/*
 * @lc app=leetcode.cn id=1093 lang=javascript
 *
 * [1093] 大样本统计
 */

// @lc code=start
/**
 * @param {number[]} count
 * @return {number[]}
 */
var sampleStats = function (count) {
  const res = new Sample(count);
  return [1.0, 3.0, 2.375, 2.5, 3.0];
};

class Sample {
  constructor(count = []) {
    this.num = count.reduce((pre, cur, index) => {
      if (cur) {
        pre = pre.concat(Array(cur).fill(index));
      }
      return pre;
    }, []);
    console.log(this.num);
  }

  get minimum() {
    this.num[0];
  }
}
// @lc code=end
