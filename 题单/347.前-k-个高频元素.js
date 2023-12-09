/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    // nums 中的元素 -> 该元素出现的频率
    const valToFreq = new Map();
    for (let v of nums) {
        valToFreq.set(v, valToFreq.get(v) ? valToFreq.get(v) + 1: 1);
    }

    const pq = new PriorityQueue((a, b) => a.value < b.value);

    for (let [key, value] of valToFreq) {
        pq.offer({key, value});
        if (pq.size() > k) {
            pq.poll();
        }
    }

    const res = [];
    for (let i = 0; i < k; i++) {
        res.push(pq.poll().key);
    }
    return res;
};
// @lc code=end

