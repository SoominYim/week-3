class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function createList(): { normal_1: ListNode; cycle_1: ListNode } {
  const normal_1 = new ListNode(1);
  const normal_2 = new ListNode(2);
  const normal_3 = new ListNode(3);
  const normal_4 = new ListNode(4);
  const normal_5 = new ListNode(5);

  normal_1.next = normal_2;
  normal_2.next = normal_3;
  normal_3.next = normal_4;
  normal_4.next = normal_5;

  const cycle_1 = new ListNode(1);
  const cycle_2 = new ListNode(2);
  const cycle_3 = new ListNode(3);
  const cycle_4 = new ListNode(4);
  const cycle_5 = new ListNode(5);

  cycle_1.next = cycle_2;
  cycle_2.next = cycle_3;
  cycle_3.next = cycle_4;
  cycle_4.next = cycle_5;
  cycle_5.next = cycle_3;

  return { normal_1, cycle_1 };
}

const { normal_1, cycle_1 } = createList();

// 첫 번째 시도
// 순환 리스트와 일반 리스트를 생성해서 시각화 하려고 했는데
// 애초에 순환 리스트는 JSON으로 변환 할 때 에러를 뱉더군요
// 안막아줬다면 램이 터지겠죠...? 실무에선 이걸로 순환하는지 확인해도 되지 않을까...요
// TypeError: Converting circular structure to JSON
function hasCycle_1(head: ListNode | null): boolean {
  try {
    JSON.stringify(head);
    return false;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Converting circular structure to JSON")) return true;
    throw error;
  }
}
// console.log(hasCycle_1(normal_1));
// console.log(hasCycle_1(cycle_1));

// 두 번째 시도
// 전체적으로 탐색하고 중복되면 true를 뱉으면 되기 때문에 Set을 사용해서 중복처리를 하면 될 것 같았습니다
// visited라는 Set을 만들어서 탐색한 노드를 저장하고 head는 탐색한 노드를 가리키는 포인터 변수로 사용하고,
// 계속해서 .next를 통해 탐색하고, 만약 중복 된다면 순환 리스트로 반환하는 식으로 작성했습니다
function hasCycle_2(head: ListNode | null): boolean {
  const visited = new Set<ListNode>();

  while (head) {
    if (visited.has(head)) return true;

    visited.add(head);
    head = head.next;
  }
  return false;
}

console.log(hasCycle_2(normal_1));
console.log(hasCycle_2(cycle_1));
