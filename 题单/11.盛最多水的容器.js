/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let res = 0;

  while (left < right) {
    const leftHeight = height[left];
    const rightHeight = height[right];
    const area = (right - left) * Math.min(leftHeight, rightHeight);
    res = res < area ? area : res;
    leftHeight < rightHeight ? left++ : right--;
  }

  return res;
};
// @lc code=end
