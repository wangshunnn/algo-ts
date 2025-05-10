/**
 * * 力扣优先队列库实现（ datastructures-js/priority-queue@5.3.0 ）
 * * https://github.com/datastructures-js/priority-queue/tree/fb4fdb984834421279aeb081df7af624d17c2a03
 *
 * * API 用法示例
 */

// **** 构造初始化
// * 最小堆
const minPQ = new PriorityQueue((a: number, b: number) => a - b)
// * 最大堆
const maxPQ = new PriorityQueue((a: number, b: number) => b - a)
// *** 方法属性
// * 入堆，O(log(n))，没有返回值，O(log(n))
minPQ.enqueue(123)
// * 出堆，弹出堆首（最小），O(log(n))
const min = minPQ.dequeue()
// * 获取堆首，不弹出（最小）
const min_item = minPQ.front()
// * 获取堆尾，不弹出（最大）
const max_item = minPQ.back()
// * 判空
const isEmpty = minPQ.isEmpty()
// * 堆的长度
const len = minPQ.size()
// * 转化为数组
const arr = minPQ.toArray()
// * 清空
minPQ.clear()

/** ------------------------------------------------------------------------------ */

/**
 * * 手动式实现优先队列，基于堆实现
 */
class Heap<T> {
  private _heap: T[]
  private readonly _compare: (a: number, b: number) => boolean

  // 默认最小堆
  constructor({ compare = (a: T, b: T) => a > b } = {}) {
    this._heap = []
    this._compare = (index1: number, index2: number) => compare(this._heap[index1], this._heap[index2])
  }

  size() {
    return this._heap.length
  }

  peek() {
    return this._heap[0]
  }

  isEmpty() {
    return this.size() === 0
  }

  getParentIndex(i: number) {
    return (i - 1) >> 1
  }

  getLeftChildIndex(i: number) {
    return 2 * i + 1
  }

  getRightChildIndex(i: number) {
    return 2 * i + 2
  }

  private swap(index1: number, index2: number) {
    ;[this._heap[index1], this._heap[index2]] = [this._heap[index2], this._heap[index1]]
  }

  // 下沉
  private heapifyDown(index: number) {
    const leftIndex = this.getLeftChildIndex(index)
    const rightIndex = this.getRightChildIndex(index)
    let findIndex = index
    if (leftIndex < this.size() && this._compare(findIndex, leftIndex)) {
      findIndex = leftIndex
    }
    if (rightIndex < this.size() && this._compare(findIndex, rightIndex)) {
      findIndex = rightIndex
    }
    if (findIndex !== index) {
      this.swap(findIndex, index)
      this.heapifyDown(findIndex)
    }
  }

  // 上浮
  private heapifyUp(index: number) {
    if (index === 0) {
      return false
    }
    const parentIndex = this.getParentIndex(index)
    if (this._compare(parentIndex, index)) {
      this.swap(index, parentIndex)
      this.heapifyUp(parentIndex)
    }
  }

  insert(value: T) {
    this._heap.push(value)
    this.heapifyUp(this._heap.length - 1)
  }

  pop() {
    if (this.isEmpty()) {
      return null
    }
    this.swap(0, this.size() - 1)
    const popValue = this._heap.pop()
    this.heapifyDown(0)
    return popValue
  }
}

class MinHeap<T> extends Heap<T> {
  constructor() {
    super({ compare: (a, b) => a > b })
  }
}

class MaxHeap<T> extends Heap<T> {
  constructor() {
    super({ compare: (a, b) => a < b })
  }
}

/** 测试 */
/** 最大堆 */
const PQ = new Heap<number>({ compare: (a, b) => a < b })
PQ.insert(3)
PQ.insert(1)
PQ.insert(4)
console.log('shun-PQ: ', PQ.pop(), PQ)
/** 最小堆 */
const MinPQ = new MinHeap()
MinPQ.insert(3)
MinPQ.insert(1)
MinPQ.insert(4)
console.log('shun-MinPQ: ', MinPQ.pop(), MinPQ)
/** 最大堆 */
const MaxPQ = new MaxHeap()
MaxPQ.insert(3)
MaxPQ.insert(1)
MaxPQ.insert(4)
console.log('shun-MinPQ: ', MaxPQ.pop(), MaxPQ)
