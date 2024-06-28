/*
 * @lc app=leetcode.cn id=1019 lang=javascript
 *
 * [1019] 链表中的下一个更大节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
  const ans = []
  const stack = []

  while (head) {
    while (stack.length && stack[stack.length - 1][0] < head.val) {
      const pop = stack.pop()
      ans[pop[1]] = head.val
    }
    stack.push([head.val, ans.length])
    ans.push(0)
    head = head.next
  }

  return ans
}
// @lc code=end
6666666
