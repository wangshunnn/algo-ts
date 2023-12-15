/**
 * 树状 dp
 * * LC 307
 */
class NumArray {
    private nums: number[]
    private tree: number[]
    constructor(nums: number[]) {
        this.nums = new Array(nums.length).fill(0)
        this.tree = new Array(nums.length + 1).fill(0)
        this.initTree(nums)
    }

    /**
     * 初始化树状数组 O(nlogn)
     * 备注：灵神题解可以优化到 O(n)
     */
    private initTree(nums: number[]): void {
        for (let i = 0; i < nums.length; i++) {
            this.update(i, nums[i])
        }
    }

    /**
     * lowbit 算法，方便计算父节点
     */
    private lowbit(num: number): number {
        return num & -num
    }

    /**
     * 动态维护前缀和 O(logn)
     */
    private prefixSum(index: number): number {
        let sum = 0
        for (let i = index; i > 0; i -= this.lowbit(i)) {
            sum += this.tree[i]
        }
        return sum
    }

    /**
     * 单点修改 O(logn)
     */
    update(index: number, val: number): void {
        const delta = val - this.nums[index]
        this.nums[index] = val
        for (let i = index + 1; i < this.tree.length; i += this.lowbit(i)) {
            this.tree[i] += delta
        }
    }

    /**
     * 区间查询 O(logn)
     */
    sumRange(left: number, right: number): number {
        return this.prefixSum(right + 1) - this.prefixSum(left)
    }
}

/**
 * var obj = new NumArray(nums)
 * Your NumArray object will be instantiated and called as such:
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
