class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const node_1 = new ListNode(1);
const node_2 = new ListNode(2);
const node_3 = new ListNode(3);
const node_4 = new ListNode(4);
const node_5 = new ListNode(5);

node_1.next = node_2;
node_2.next = node_3;
node_3.next = node_4;
node_4.next = node_5;

/**
reverse 시키는 것은 head의 next 값들을 현재 값의 이전으로 하나하나 보내져야 뒤집히기 때문에
현재 값은 포인터가 되기 떄문에 curr(pointer)를 만들어 주었고 이전 값을 저장 할 prev를 만들었습니다

그 다음 생각한 건 리스트를 순회하면서 각 노드의 방향을 하나씩 반대로 바꿔주면 되지 않을까였습니다
예를 들어 1 → 2 → 3 → 4 → 5 라는 리스트가 있을 때,
1의 next를 null로 만들고, 2의 next를 1로, 3의 next를 2로 ... 이런 식으로 연결을 뒤집는 구조로..

하지만 문제는 연결을 바꾸는 순간, 기존의 다음 노드를 잃어버려 순회가 끊겼습니다
예를 들어 curr가 2일 때 curr.next를 이전 노드로 돌려버리면 그 다음 처리할 노드(3)에 접근할 방법이 사라지기 때문에
next라는 임시 포인터를 하나 더 두고 이 포인터는 현재 노드(curr)의 다음 노드를 미리 백업해두는 용도로 사용했습니다
curr.next를 변경한 뒤에도 다음 노드(next)를 따라가면 리스트를 끊김 없이 순회할 수 있습니다

전체적으로는 curr가 리스트를 앞으로 따라가고 prev가 뒤에서부터 하나씩 연결을 되돌리며 따라가는 구조로 설계했고
이 과정을 반복하면서 curr가 끝(null)까지 가면 prev가 역순으로 바뀐 리스트의 head가 되므로 그걸 반환하면 됩니다


curr = 1, prev = null, next = 2
1 => 2 => 3 => 4 => 5 => null
한번 뒤집는다면
curr = 2, prev = 1, next = 3
2 => 1 => 3 => 4 => 5 => null
두번 뒤집는다면
curr = 3, prev = 2, next = 4
3 => 2 => 1 => 4 => 5 => null
세번 뒤집는다면
curr = 4, prev = 3, next = 5
4 => 3 => 2 => 1 => 5 => null
네번 뒤집는다면
curr = 5, prev = 4, next = null
5 => 4 => 3 => 2 => 1 => null
이렇게 되면 모두 뒤집히게 되지요
*/

function reverseList(head: ListNode | null): ListNode | null {
  let curr: ListNode | null = head;
  let prev: ListNode | null = null;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

function reverseList_test(head: ListNode | null): ListNode | null {
  let curr: ListNode | null = head;
  let prev: ListNode | null = null;
  let step = 0;

  console.log("== 연결 리스트 뒤집기 시작 ==");
  console.log("초기 head 상태:", JSON.stringify(head, null, 2));

  while (curr) {
    const next = curr.next;

    console.log("--------------------------------");
    console.log(`${++step}회전`);
    console.log(`curr: ${curr.val}`);
    console.log(`prev: ${prev ? prev.val : "null"}`);
    console.log(`next: ${next ? next.val : "null"}`);

    curr.next = prev;

    prev = curr;
    curr = next;

    console.log("뒤집힌 현재 리스트 상태 (prev 기준):");
    console.log(JSON.stringify(prev, null, 2));
  }

  console.log("--------------------------------");
  console.log("최종 결과:");
  console.log(JSON.stringify(prev, null, 2));

  return prev;
}

// 재귀 한줄
// const reverseList = (head: ListNode | null, prev: ListNode | null = null): ListNode | null =>
//   head ? reverseList(head.next, Object.assign(head, { next: prev })) : prev;

// 구조 분해 할당
// function reverseList(head: ListNode | null): ListNode | null {
//   let curr: ListNode | null = head;
//   let prev: ListNode | null = null;
//   while (curr) {
//     [curr.next, curr, prev] = [prev, curr.next, curr];
//   }
//   return prev;
// }

// const reversed = reverseList(node_1);
const reversed_test = reverseList_test(node_1);

// console.log(JSON.stringify(reversed, null, 2));
// console.log(JSON.stringify(reversed_test, null, 2));
