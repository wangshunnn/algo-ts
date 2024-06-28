/*
 * @lc app=leetcode.cn id=1026 lang=javascript
 *
 * [1026] 节点与其祖先之间的最大差值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  let maxDiff = 0

  function dfs(root, min, max) {
    if (!root) {
      return 0
    }

    const val = root.val
    const res = Math.max(Math.abs(min - val), Math.abs(max - val))
    maxDiff = Math.max(res, maxDiff)

    const _min = Math.min(min, root.val)
    const _max = Math.max(max, val)

    dfs(root.left, _min, _max)
    dfs(root.right, _min, _max)
  }

  dfs(root, root.val, root.val)

  return maxDiff
}

// @lc code=end
