/*
 * @lc app=leetcode.cn id=264 lang=javascript
 *
 * [264] 丑数 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// ! 方法一：使用力扣自带的优先队列库（推荐）
// * API: https://github.com/datastructures-js/priority-queue
var nthUglyNumber1 = function (n) {
  const factors = [2, 3, 5]
  const seen = new Set() // 哈希表去重，防止重复入堆
  // ! a-b 表示递增（小顶堆），b-a 表示递减（大顶堆）
  const heap = new PriorityQueue({ compare: (a, b) => a - b })
  seen.add(1)
  // * enqueue 表示 insert 入堆
  heap.enqueue(1)
  // console.log(heap.toArray()) // 可以转化为数组查看
  let ugly = 0
  for (let i = 0; i < n; i++) {
    // * dequeue 表示 pop 出堆
    ugly = heap.dequeue()
    for (const factor of factors) {
      const next = ugly * factor
      if (!seen.has(next)) {
        seen.add(next)
        heap.enqueue(next)
      }
    }
  }
  return ugly
}

// * 方法二：js 自己实现小顶堆/最小堆
var nthUglyNumber = function (n) {
  const seen = new Set()
  const heap = new MinHeap()

  seen.add(1)
  heap.insert(1)
  let ugly = 0

  for (let i = 0; i < n; i++) {
    ugly = heap.pop()
    for (const factor of [2, 3, 5]) {
      const next = ugly * factor
      if (!seen.has(next)) {
        seen.add(next)
        heap.insert(next)
      }
    }
  }
  return ugly
}

// ! js 自己实现小顶堆
class MinHeap {
  constructor() {
    this.heap = []
  }

  getParentIndex(i) {
    return (i - 1) >> 1
  }

  getLeftIndex(i) {
    return i * 2 + 1
  }

  getRightIndex(i) {
    return i * 2 + 2
  }

  swap(i1, i2) {
    ;[this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]]
  }

  insert(value) {
    this.heap.push(value)
    this.swim(this.heap.length - 1)
  }

  pop() {
    this.heap[0] = this.heap.pop()
    this.sink(0)
    return this.heap[0]
  }

  swim(index) {
    if (index === 0) {
      return
    }
    const parentIndex = this.getParentIndex(index)
    if (this.heap[index] < this.heap[parentIndex]) {
      this.swap(parentIndex, index)
      this.swim(parentIndex)
    }
  }

  sink(index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    let findIndex = index
    if (
      findIndex < this.size() &&
      this.heap[leftIndex] < this.heap[findIndex]
    ) {
      findIndex = leftIndex
    }

    if (
      findIndex < this.size() &&
      this.heap[rightIndex] < this.heap[findIndex]
    ) {
      findIndex = rightIndex
    }

    if (findIndex !== index) {
      this.swap(findIndex, index)
      this.sink(findIndex)
    }
  }

  peek() {
    return this.heap[0]
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() === 0
  }
}
// @lc code=end
