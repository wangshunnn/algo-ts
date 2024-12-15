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

interface PriorityQueueOptions<T> {
  priority?: (element: T) => number
  compare?: (a: T, b: T) => number
}

interface PriorityQueueItem<T> {
  priority: number
  element: T
}

declare class PriorityQueue<T> {
  constructor(options?: PriorityQueueOptions<T>)
  size(): number
  isEmpty(): boolean
  front(): PriorityQueueItem<T> | T
  back(): PriorityQueueItem<T> | T
  enqueue(element: T, priority?: number): PriorityQueue<T>
  dequeue(): PriorityQueueItem<T> | T
  toArray(): (PriorityQueueItem<T> | T)[]
  clear(): void
}
