export const dummyCode = `function twoSum(nums, target) {
  const valueToIndex = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (valueToIndex.has(complement)) {
      return [valueToIndex.get(complement), i];
    }
    valueToIndex.set(nums[i], i);
  }

  return [-1, -1];
}`;

export const dummyCheckpoints = [
  {
    id: "cp-1",
    line: 1,
    title: "함수 선언",
    description: "문제 해결을 위한 twoSum 함수의 시그니처입니다.",
  },
  {
    id: "cp-2",
    line: 2,
    title: "보조 자료구조 초기화",
    description: "값 → 인덱스를 저장할 Map을 초기화합니다.",
  },
  {
    id: "cp-3",
    line: 4,
    title: "선형 순회 시작",
    description: "배열을 한 번만 순회하여 O(n) 시간복잡도를 달성합니다.",
  },
  {
    id: "cp-4",
    line: 6,
    title: "보수값 검사",
    description: "target - 현재값이 Map에 존재한다면 정답 페어를 찾은 것입니다.",
  },
  {
    id: "cp-5",
    line: 10,
    title: "실패 케이스",
    description: "조건을 만족하는 인덱스쌍이 없을 때 기본값을 반환합니다.",
  },
];


