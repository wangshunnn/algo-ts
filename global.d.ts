import {
  PriorityQueue as IPriorityQueue,
  MinPriorityQueue as IMinPriorityQueue,
  MaxPriorityQueue as IMaxPriorityQueue,
} from '@datastructures-js/priority-queue'

declare global {
  const PriorityQueue: typeof IPriorityQueue
  const MinPriorityQueue: typeof IMinPriorityQueue
  const MaxPriorityQueue: typeof IMaxPriorityQueue
}

declare class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
