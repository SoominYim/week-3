class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// root가 null이면 0을 반환하고 root가 존재하면 왼쪽 서브트리와 오른쪽 서브트리의 깊이를 각각 계산하고
// 두 서브트리 깊이 중 더 큰 값을 선택하고 현재 노드를 포함하기 위해 1을 더하는 과정을 재귀적으로 반복하면서 최종 깊이를 반환하게 작성했습니다
const maxDepth = (root: TreeNode | null): number =>
  root ? Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 : 0;

const node_1 = new TreeNode(3);
const node_2 = new TreeNode(9);
const node_3 = new TreeNode(20);
const node_4 = new TreeNode(15);
const node_5 = new TreeNode(7);

node_1.left = node_2;
node_1.right = node_3;
node_3.left = node_4;
node_3.right = node_5;

console.log(maxDepth(node_1));
