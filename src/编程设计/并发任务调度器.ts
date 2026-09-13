/**
 * 面试题：实现一个异步任务调度器
 *
 * 要求：
 * - 等待中的任务按照添加顺序开始执行；
 * - 同一时刻最多只能运行 maxConcurrency 个任务；
 * - add 返回一个 Promise，保留原任务的返回值和异常。
 */

type Task<T> = () => T | PromiseLike<T>
type QueuedTask = () => void

export class Scheduler {
  private runningCount = 0
  private readonly queue: QueuedTask[] = []
  private readonly maxConcurrency: number

  constructor(maxConcurrency = 2) {
    if (!Number.isInteger(maxConcurrency) || maxConcurrency < 1) {
      throw new RangeError('maxConcurrency must be a positive integer')
    }

    this.maxConcurrency = maxConcurrency
  }

  add<T>(task: Task<T>): Promise<T> {
    if (typeof task !== 'function') {
      throw new TypeError('task must be a function')
    }

    return new Promise<T>((resolve, reject) => {
      this.queue.push(() => {
        this.runningCount++

        Promise.resolve()
          .then(task)
          .then(resolve, reject)
          .finally(() => {
            this.runningCount--
            this.runNext()
          })
      })

      this.runNext()
    })
  }

  private runNext(): void {
    while (this.runningCount < this.maxConcurrency && this.queue.length > 0) {
      this.queue.shift()!()
    }
  }
}

/**
 * 题目给定的测试代码：
 *
 * timeout 用来模拟执行时间不同的异步任务。
 * Scheduler 的最大并发数为 2，因此初始时只有任务 1、2 会立即开始，
 * 任务 3、4 需要等待前面的任务完成后再依次开始。
 * addTask 会在每个任务完成时输出其编号，预期输出顺序为：2、3、1、4。
 */
const timeout = (time: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler(2)

const addTask = (time: number, order: string): Promise<void> =>
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log(order)
    })

void addTask(1000, '1')
void addTask(500, '2')
void addTask(300, '3')
void addTask(400, '4')

/**
 * 输出：2 3 1 4
 *
 * 0ms：   任务 1、2 开始运行
 * 500ms： 任务 2 完成，输出 2，任务 3 开始运行
 * 800ms： 任务 3 完成，输出 3，任务 4 开始运行
 * 1000ms：任务 1 完成，输出 1
 * 1200ms：任务 4 完成，输出 4
 */
