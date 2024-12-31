/**
 * BFS 模板代码
 * @param graph 图
 * @param startNode 起始节点
 */
function bfs(graph: number[][], startNode: number) {
  // 创建一个队列并将起始节点入队
  const queue: number[] = []
  queue.push(startNode)

  // 创建一个 Set 用于记录访问过的节点
  const visited = new Set()
  visited.add(startNode)

  // 当队列不为空时，继续执行
  while (queue.length > 0) {
    // 从队列中取出一个节点
    const currentNode = queue.shift()!

    // 处理当前节点
    console.log(currentNode) // 这里可以进行其他处理操作

    // 遍历当前节点的邻居节点
    for (const neighbor of graph[currentNode]) {
      // 如果邻居节点没有被访问过，将其加入队列并标记为已访问
      if (!visited.has(neighbor)) {
        queue.push(neighbor)
        visited.add(neighbor)
      }
    }
  }
}
