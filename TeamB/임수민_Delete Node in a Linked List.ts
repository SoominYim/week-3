/**
 * 기존에 풀던 코테와는 다른 영역인 것 같아서 테스트 하는 걸 작성하는데만 시간이 좀 걸렸습니다
 * 우선 문제가 head도 주어지지 않고 아무것도 없는 상태에 삭제할 노드만 주어졌으니.. 추상적으로는 할 순 없고 시각화먼저 해보려고 했습니다
 * 우선 문제의 예제에서 주어진 listNode로 head를 만들어서 테스트 했습니다
 * 여기서 node_1은 head가 됩고 일반 적으로 console.log(node_1)을 하게되면 depth에 한계가 있어 [ListNode]로 생략되서 출력되었습니다
 * 방법을 생각하다 JSON으로 출력하면 depth상관없이 출력이 된다 생각해 JSON.stringify()을 사용해 출력했습니다.
 * JSON.stringify(value[, replacer[, space]]) replacer는 출력할 값을 replace하는 함수를 전닳하는 부분인데 어차피 안쓰니까 null로 두고
 * space는 치환하는 곳인데 자동으로 줄바꿈 되고 문자열을 넣으면 replace되고 int를 넣으면 tabSize로 사용됩니다
 * 실제 출력 예시
 * {
 *   "val": 4,
 *   "next": {
 *     "val": 5,
 *     "next": {
 *       "val": 1,
 *       "next": {
 *         "val": 9,
 *         "next": null
 *       }
 *     }
 *   }
 * }
 */
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

const node_1 = new ListNode(4);
const node_2 = new ListNode(5);
const node_3 = new ListNode(1);
const node_4 = new ListNode(9);

node_1.next = node_2;
node_2.next = node_3;
node_3.next = node_4;

/**
 * 첫 번째 시도
 * 출력 값
 * {
 *   "val": 4,
 *   "next": {}
 * }
 * 간단하게 val, next만 삭제하면 될 줄 알았는데 오만이였습니다 허허
 * 애초에 {val,next:{val,next...}} 형식으로 이어져 있어서 삭제 한다면 node들도 통으로 삭제된다는걸 왜 몰랐을까 전 바보입니다
 */

const deleteNode_fail = (node: ListNode) => {
  delete (node as any).val;
  delete (node as any).next;
};
deleteNode_fail(node_2);
console.log("deleteNode_fail", JSON.stringify(node_1, null, 2));

/**
 * 두 번째 시도
 * 그래서 다른 접근을 고민하다 치환 밖에 생각이 나지 않아 치환을 해봤습니다
 * 객체를 치환할때 자주 사용하던 Object.assign()을 사용해서 치환을 해봤습니다
 * Object.assign(target, source) target에 source를 복사해서 덮어 씌워줍니다
 * 출력 값
 * {
 *   "val": 4,
 *   "next": {
 *     "val": 1,
 *     "next": {
 *       "val": 9,
 *       "next": null
 *     }
 *   }
 * }
 * 우선 패스는 했는데 메모리 사용량이 너무 심해서 다른 방법도 시도 해봤습니다.
 */

// const deleteNode = (node: ListNode) => {
//   Object.assign(node, node.next);
// };

/**
 * 세 번째 시도
 * 첫 번째로 배열 구조 분해 할당을 사용해서 치환을 해봤는데, 여전히 메모리가 낮은 것 같아
 * 직접 원본을 수정하여 치환을 했습니다. 둘 다 출력 값은 동일합니다.
 * 출력 값
 * {
 *   "val": 4,
 *   "next": {
 *     "val": 1,
 *     "next": {
 *       "val": 9,
 *       "next": null
 *     }
 *   }
 * }
 *
 */

const deleteNode = (node: ListNode) => {
  [node.val, node.next] = [node.next!.val, node.next!.next];
};

const deleteNode_2 = (node: ListNode) => {
  node.val = node.next!.val;
  node.next = node.next!.next;
};

deleteNode(node_2);
console.log(JSON.stringify(node_1, null, 2));
