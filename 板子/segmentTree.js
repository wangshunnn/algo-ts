/**
 * 线段树 
 * LC 2407 https://leetcode.cn/problems/longest-increasing-subsequence-ii/description/
 */


/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
function Node(start, end) {
  this.val = 0;
  this.start = start;
  this.end = end;
  this.left = null;
  this.right = null;
  this.isLazy = false;
  this.lazyValue = 0;
}

function SegmentTree(start, end) {
  this.root = new Node(start, end);
}

SegmentTree.prototype.update = function (start, end, delta) {
  this.updateNode(this.root, start, end, delta);
};

SegmentTree.prototype.updateNode = function (node, start, end, delta) {
  if (!node) {
    return;
  }
  if (start > node.end || end < node.start) {
    return;
  } else if (start <= node.start && end >= node.end) {
    if (delta > node.val) {
      node.val = delta;

      node.isLazy = true;
      node.lazyValue = delta;
    }

    return;
  } else {
    this.pushdown(node);
    this.updateNode(node.left, start, end, delta);
    this.updateNode(node.right, start, end, delta);
    this.pushup(node);
  }
};

SegmentTree.prototype.pushdown = function (node) {
  if (!node) {
    return;
  }
  const mid = Math.floor((node.start + node.end) / 2);
  if (!node.left) {
    node.left = new Node(node.start, mid);
  }
  if (!node.right) {
    node.right = new Node(mid + 1, node.end);
  }
  if (node.isLazy) {
    node.left.isLazy = true;
    node.right.isLazy = true;
    node.left.lazyValue = node.lazyValue;
    node.right.lazyValue = node.lazyValue;
    node.left.val = node.lazyValue;
    node.right.val = node.lazyValue;

    node.isLazy = false;
    node.lazyValue = 0;
  }
};

SegmentTree.prototype.pushup = function (node) {
  node.val = Math.max(node.left.val, node.right.val);
};

SegmentTree.prototype.query = function (start, end) {
  return this.queryNode(this.root, start, end);
};

SegmentTree.prototype.queryNode = function (node, start, end) {
  if (!node) {
    return 0;
  }
  if (start > node.end || end < node.start) {
    return 0;
  } else if (start <= node.start && node.end <= end) {
    return node.val;
  } else {
    this.pushdown(node);
    return Math.max(
      this.queryNode(node.left, start, end),
      this.queryNode(node.right, start, end)
    );
  }
};
var lengthOfLIS = function (nums, k) {
  let ret = [];
  let sg = new SegmentTree(0, 10 ** 10);
  for (let i = nums.length - 1; i >= 0; i--) {
    let tmp = sg.query(nums[i] + 1, nums[i] + k);
    sg.update(nums[i], nums[i], tmp + 1);
  }
  return sg.query(0, 10 ** 10);
};
