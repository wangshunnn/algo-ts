/**
 * * 并查集TS 模板
 */
class UnionFind {
    private fa: number[] // 每个节点的祖先，初始化为自己
    private size: number[] // 每个连通分量的数量
    private setCount: number // 当前连通分量的节点数（可选）

    constructor(n: number) {
        this.fa = new Array(n).fill(-1).map((_, i) => i)
        this.size = new Array(n).fill(1)
        this.setCount = n
    }

    find(x: number): number {
        if (this.fa[x] !== x) {
            // 路径压缩
            this.fa[x] = this.find(this.fa[x])
        }
        return this.fa[x]
    }

    union(a: number, b: number): boolean {
        const pa = this.find(a)
        const pb = this.find(b)
        if (pa === pb) {
            return false
        }
        // 连通分量节点少的往多的合并，可以降低树的高度降低时间复杂度
        if (this.size[pb] < this.size[pa]) {
            this.fa[pb] = pa
            this.size[pa] += this.size[pb]
        } else {
            this.fa[pa] = pb
            this.size[pb] += this.size[pa]
        }
        this.setCount-- // 连通分量数减一
        return true
    }

    connected(a: number, b: number): boolean {
        return this.find(a) === this.find(b)
    }
}
