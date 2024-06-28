/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head,
    fast = head

  // 第一次相遇，slow = nb
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      break
    }
  }

  if (!fast || !fast.next) {
    return null
  }

  // slow 再走 a 步到入口点（a + nb)
  fast = head
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }

  return fast
}
// @lc code=end
