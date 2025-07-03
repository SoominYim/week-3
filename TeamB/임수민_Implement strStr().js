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

// 번외 재귀 한줄 풀이
const strStr_recursive = (haystack, needle, i = 0) => (
  (sliceStr = haystack.slice(i, i + needle.length)),
  (valid = i <= haystack.length - needle.length),
  !valid ? -1 : sliceStr === needle ? i : strStr_recursive(haystack, needle, i + 1)
);
