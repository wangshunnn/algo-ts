/**
 * * 力扣优先队列库实现（ datastructures-js/priority-queue@5.3.0 ）
 * * https://github.com/datastructures-js/priority-queue/tree/fb4fdb984834421279aeb081df7af624d17c2a03
 * 
 * * API 用法示例
 */

// **** 构造初始化
// * 最小堆
const minPQ = new PriorityQueue({ compare: (a, b) => a - b })
// * 最大堆
const maxPQ = new PriorityQueue({ compare: (a, b) => b - a })
// *** 方法属性
// * 入堆，O(log(n))，没有返回值，O(log(n))
minPQ.enqueue(item)
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
class Heap {
  constructor(options = {}) {
    const { compare = (a, b) => a - b } = options;
    this.heap = [];
    this.compare = (index1, index2) =>
      compare(this.heap[index1], this.heap[index2]);
  }

  getParentIndex(i) {
    return (i - 1) >> 1;
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  isEmpty() {
    return this.size() === 0;
  }

  heapifyUp(index) {
    // 上浮
    if (index === 0) {
      return false;
    }

    const parentIndex = this.getParentIndex(index);

    if (this.compare(parentIndex, index) > 0) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    // 下沉
    const leftIndex = this.getLeftChildIndex(index);
    const rightIndex = this.getRightChildIndex(index);
    let findIndex = index;
    if (leftIndex < this.size() && this.compare(findIndex, leftIndex) > 0) {
      findIndex = leftIndex;
    }
    if (rightIndex < this.size() && this.compare(findIndex, rightIndex) > 0) {
      findIndex = rightIndex;
    }

    if (findIndex !== index) {
      this.swap(findIndex, index);
      this.heapifyDown(findIndex);
    }
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    this.swap(0, this.size() - 1);
    const popValue = this.heap.pop();
    this.heapifyDown(0);
    return popValue;
  }
}

class MinHeap extends Heap {
  constructor() {
    super({ compare: (a, b) => a - b });
  }
}

class MaxHeap extends Heap {
  constructor() {
    super({ compare: (a, b) => b - a });
  }
}

/** 测试 */
const PQ = new Heap({ compare: (a, b) => a - b });
PQ.insert(3);
PQ.insert(1);
PQ.insert(4);
console.log("shun-PQ: ", PQ.pop(), PQ);
/** 最小堆 */
const MinPQ = new MinHeap();
MinPQ.insert(3);
MinPQ.insert(1);
MinPQ.insert(4);
console.log("shun-MinPQ: ", MinPQ.pop(), MinPQ);
/** 最大堆 */
const MaxPQ = new MaxHeap();
MaxPQ.insert(3);
MaxPQ.insert(1);
MaxPQ.insert(4);
console.log("shun-MinPQ: ", MaxPQ.pop(), MaxPQ);
