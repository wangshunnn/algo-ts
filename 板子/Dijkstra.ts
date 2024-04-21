/**
 * 使用 Dijkstra 算法计算从给定起点到图中所有节点的最短路径长度。
 * @param g 邻接表表示的图，每个节点列表中的元素是一个二元组 [目标节点, 边的权重]。
 * @param start 起始节点的索引。
 * @returns 返回一个数组，其中第 i 个元素是起点到节点 i 的最短路径长度。如果某个节点不可达，则对应值为 Infinity。
 * 
 * 使用优先队列（最小堆）优化后，时间复杂度可达到 $O((V + E)log V)$，其中 $E$ 是边的数量。这是因为每个顶点最多入队出队一次，每个边最多触发一次优先队列的更新。
 * 
 */
function dijkstra(g: number[][][], start: number): number[] {
  const distance: number[] = new Array(g.length).fill(Infinity);
  distance[start] = 0;
  // @ts-ignore
  const queue = new PriorityQueue({ compare: (a, b) => a.wight - b.wight });
  queue.enqueue({ node: start, wight: 0 });
  while (!queue.isEmpty()) {
    const { node, wight } = queue.dequeue();
    if (wight > distance[node]) {
      continue;
    }
    for (const [v, w] of g[node]) {
      const nextW = wight + w;
      if (nextW < distance[v]) {
        distance[v] = nextW;
        queue.enqueue({ node: v, wight: nextW });
      }
    }
  }
  return distance;
}

/**
 * 应用题
 * * [周赛T4-100276.最短路径中的边](https://leetcode.cn/problems/find-edges-in-shortest-paths/description/)
 */
function findAnswer(n: number, edges: number[][]): boolean[] {
  const g: number[][][] = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    g[u].push([v, w]);
    g[v].push([u, w]);
  }
  const dist1 = dijkstra(g, 0);
  const dist2 = dijkstra(g, n - 1);
  let ans: boolean[] = new Array(edges.length).fill(false);
  if (dist1[n - 1] === Infinity) {
    return ans;
  }
  for (const id in edges) {
    const [u, v, w] = edges[id];
    // 可达性分析
    if (
      dist1[u] + w + dist2[v] === dist1[n - 1] ||
      dist1[v] + w + dist2[u] === dist1[n - 1]
    ) {
      ans[id] = true;
    }
  }
  return ans;
}