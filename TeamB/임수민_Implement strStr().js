// 사실 indexOf만 쓰면 되는거라 그냥 넘어가고 싶었지만 문제 풀이 과정을 써보고 싶어서 풀었습니당
const strStr_indexOf = (haystack, needle) => haystack.indexOf(needle);

/*
 * 1. 반복을 haystack.length - needle.length만큼만 한 이유를 예를 들어 설명하자면
 * 첫번째 인자 length가 5, 두번째 인자 length 3일 경우
 * 탐색 하는 인덱스는 0~2, 1~3, 2~4, 이기 때문에 3번만 돌리면 됩니다
 * 0,1,2 : 0 ~ 2 총 세번 반복되게만 하면 되기 때문에
 * 5 - 3: haystack.length - needle.length 가 되는 것입니다
 *
 * 2.비교할 str을 만들려면 위에서 말한 것처럼 0~2, 1~3... 대로 잘랐습니다
 * 마이너하지만 자주 헷갈리는 것
 * 첫번째 인자로 넘어온 시작 인덱스가 가리키는 값은 포함하지만,
 * 두번째 인자로 넘어온 종료 인덱스가 가리키는 값은 포함하지 않음
 * 그냥 start는 index, end는 length라고 생각하면 편하다
 *
 * 3. 자른거랑 needle이랑 비교하면 끗
 */
const strStr = (haystack, needle) => {
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    const sliceStr = haystack.slice(i, i + needle.length);

    if (sliceStr === needle) return i;
  }
  return -1;
};

/*
 * 번외 재귀 한줄 풀이 (재미로 한거에용)
 * 코드 자체는 더 짧지만 가독성이 떨어지고 성능 차이 있습니다.
 *
 * 1. 콤마 연산자를 사용해 변수를 할당해줍니다.(2번 풀이와 동일합니다.)
 * (sliceStr = haystack.slice(i, i + needle.length))
 * - 콤마 연산자는 왼쪽부터 실행하고 마지막 표현식의 값을 반환
 *
 * 2. 유효성 검사를 위한 valid 변수를 써줍니다. (없어도 되지만 가독성을 위함입니다,, 허허)
 * (valid = i <= haystack.length - needle.length)
 * - 현재 인덱스가 탐색 가능한 범위 내에 있는지 확인하는 역할을 합니다.
 * - i가 haystack.length - needle.length를 넘으면 needle 길이만큼 자를 수 없습니다 (for문에서 사용한 반복 조건과 동일합니다.)
 *
 * 3. 삼항 연산자로 조건을 분기처리 해줍니다.
 * !valid ? -1 : ...
 * - valid가 false면(범위 벗어남) -1 반환 → 못 찾았다는 의미
 *
 * sliceStr === needle ? i : ...
 * - 잘라낸 문자열이 needle과 같으면 현재 인덱스 i 반환 → 찾았다는 의미
 *
 * strStr_recursive(haystack, needle, i + 1)
 * - 둘 다 아니면 다음 위치(i+1)로 재귀 호출
 *
 * 4. 동작 예시
 * strStr_recursive("hello", "ll", 0)
 * → sliceStr = "he", valid = true, "he" !== "ll" → 재귀(i=1)
 * → sliceStr = "el", valid = true, "el" !== "ll" → 재귀(i=2)
 * → sliceStr = "ll", valid = true, "ll" === "ll" → return 2
 */
const strStr_recursive = (haystack, needle, i = 0) => (
  (sliceStr = haystack.slice(i, i + needle.length)),
  (valid = i <= haystack.length - needle.length),
  !valid ? -1 : sliceStr === needle ? i : strStr_recursive(haystack, needle, i + 1)
);

// 극한의 한줄 풀이
const strStr_recursive2 = (h, n, i = 0) =>
  i > h.length - n.length ? -1 : h.slice(i, i + n.length) === n ? i : strStr_recursive2(h, n, i + 1);
