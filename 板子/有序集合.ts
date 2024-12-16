/**
 * 有序集合
 * 时间复杂度：O(logn)
 * 空间复杂度：O(n)
 * - floor: O(logn)
 * - ceiling: O(logn)
 * - delete: O(logn)
 * - add/delete: O(logn) + O(n)
 * - size: O(1)
 */
class OrderedSet {
  private items: number[] = []

  /**
   * 插入一个元素，保持集合有序
   */
  add(item: number): void {
    const index = this.binarySearch(item)
    if (index < 0) {
      this.items.splice(~index, 0, item)
    }
  }

  /**
   * 删除一个元素
   */
  delete(item: number): boolean {
    const index = this.binarySearch(item)
    if (index >= 0) {
      this.items.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * 获取小于或等于指定值的最大元素
   */
  floor(item: number): number | null {
    const index = this.binarySearch(item)
    if (index >= 0) {
      return this.items[index]
    }
    const insertPoint = ~index
    return insertPoint > 0 ? this.items[insertPoint - 1] : null
  }

  /**
   * 获取大于或等于指定值的最小元素
   */
  ceiling(item: number): number | null {
    const index = this.binarySearch(item)
    if (index >= 0) {
      return this.items[index]
    }
    const insertPoint = ~index
    return insertPoint < this.items.length ? this.items[insertPoint] : null
  }

  /**
   * 获取集合大小
   */
  get size(): number {
    return this.items.length
  }

  /**
   * 二分查找元素，返回索引或插入点的负值-1
   */
  private binarySearch(item: number): number {
    let low = 0
    let high = this.items.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const midVal = this.items[mid]

      if (midVal === item) {
        return mid
      }
      if (midVal < item) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    return ~low // 返回插入点的负值-1
  }
}
