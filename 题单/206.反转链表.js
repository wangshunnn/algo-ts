/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
// ! 递归 空间复杂度 O(N)
var reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const last = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return last;
};

// ! 迭代 空间复杂度 O(1)
// var reverseList = function (head) {
//   let cur = head;
//   let pre = null;

//   while (cur) {
//     const next = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = next;
//   }

//   return pre;
// };
// @lc code=end
