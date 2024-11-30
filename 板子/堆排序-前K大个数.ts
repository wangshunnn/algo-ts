function findKthLargest(nums: number[], k: number): number {
  const heap = nums.slice(0, k)
  // 先取前 k 个数建堆
  buildHeap(heap)
  // 遍历剩下的数，如果比堆顶大，则替换堆顶，然后堆化
  for (let i = k; i < nums.length; i++) {
    if (heap[0] < nums[i]) {
      heap[0] = nums[i]
      heapify(heap, 0, k)
    }
  }
  // 堆顶就是第 K 大的数
  return heap[0]
}

/**
 * 建堆（从最后一个非叶子结点开始倒序堆化）
 */
function buildHeap(heap: number[]) {
  const len = heap.length
  let lastId = (len - 1 - 1) >> 1
  while (lastId >= 0) {
    heapify(heap, lastId, len)
    lastId--
  }
}

/**
 * 堆化（递归下沉）
 */
function heapify(heap: number[], id: number, len: number) {
  if (id >= len) {
    return // 递归边界
  }
  const left = id * 2 + 1
  const right = left + 1
  let min = id
  if (left < len && heap[left] < heap[min]) {
    min = left
  }
  if (right < len && heap[right] < heap[min]) {
    min = right
  }
  if (min === id) {
    return // 递归边界
  }
  ;[heap[id], heap[min]] = [heap[min], heap[id]]
  heapify(heap, min, len) // 递归堆化
}
