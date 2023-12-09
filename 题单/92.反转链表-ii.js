/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let pre = dummyNode;
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next;
  }

  // 切断出一个子链表
  let leftNode = pre.next;
  let curr = rightNode.next;

  // 切断链接
  rightNode.next = null;

  // 第 4 步：同第 206 题，反转链表的子区间，接回到原来的链表中
  pre.next = reverseList(leftNode); // leftNode 翻转后的尾结点
  leftNode.next = curr;

  return dummyNode.next;
};

// 返回翻转后的首节点，head 会变为尾结点
const reverseList = (head) => {
  let cur = head;
  let pre = null;

  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
};
// var reverseBetween = function (head, left, right) {
//   // base case: 如果m为1，则相当于反转前n个节点
//   if (left == 1) {
//     return reverseN(head, right);
//   }

//   head.next = reverseBetween(head.next, --left, --right);

//   return head;
// };

// // 后驱节点
// let successor = null;

// // 反转以 head 为起点的前 n 个节点
// function reverseN(head, n) {
//   if (n == 1) {
//     // 记录后驱节点
//     successor = head.next;
//     return head;
//   }

//   // 以 head.next 为起点，需要反转前 n - 1 个节点
//   const last = reverseN(head.next, n - 1);
//   head.next.next = head;
//   head.next = successor;

//   return last;
// }
// @lc code=end
