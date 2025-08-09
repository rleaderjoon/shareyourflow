export interface SectionEntry {
  title: string;
  code: string;
  explanation: string;
}

export const sectionContent: Record<string, SectionEntry> = {
  input: {
    title: "1. 입력 처리",
    code: `// 입력 데이터 읽기 및 파싱
function parseInput(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    const arr = lines[1].split(' ').map(Number);
    const target = parseInt(lines[2]);
    
    return { n, arr, target };
}

// 예시 입력
const input = \`4
2 7 11 15
9\`;

const { n, arr, target } = parseInput(input);
console.log('배열 크기:', n);
console.log('배열:', arr);
console.log('목표값:', target);`,
    explanation:
      "입력 데이터를 파싱하여 알고리즘에서 사용할 수 있는 형태로 변환합니다. 첫 번째 줄에서 배열 크기, 두 번째 줄에서 배열 원소들, 세 번째 줄에서 목표값을 읽어옵니다.",
  },
  array: {
    title: "2. 배열 및 자료구조 초기화",
    code: `// 해시맵을 이용한 자료구조 초기화
function initializeDataStructures(arr) {
    const valueToIndex = new Map();
    const visited = new Array(arr.length).fill(false);
    const result = [];
    
    // 배열 원소들을 해시맵에 저장
    arr.forEach((value, index) => {
        if (!valueToIndex.has(value)) {
            valueToIndex.set(value, []);
        }
        valueToIndex.get(value).push(index);
    });
    
    return { valueToIndex, visited, result };
}

const { valueToIndex, visited, result } = initializeDataStructures(arr);
console.log('해시맵:', valueToIndex);`,
    explanation:
      "알고리즘 실행에 필요한 자료구조들을 초기화합니다. 해시맵을 사용하여 값과 인덱스의 매핑을 저장하고, 방문 배열과 결과 배열을 준비합니다.",
  },
  dp: {
    title: "3. 동적 프로그래밍 알고리즘",
    code: `// Two Sum 알고리즘 (해시맵 기반)
function twoSum(arr, target) {
    const map = new Map();
    
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        
        // 현재 원소의 complement가 맵에 있는지 확인
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // 현재 원소를 맵에 저장
        map.set(arr[i], i);
        
        // 디버깅용 출력
        console.log(\`Step \${i+1}: arr[\${i}] = \${arr[i]}\`);
        console.log(\`  Complement: \${complement}\`);
        console.log(\`  Map: \${JSON.stringify([...map])}\`);
    }
    
    return [];
}

const result = twoSum(arr, target);`,
    explanation:
      "메인 알고리즘을 실행합니다. 해시맵을 사용하여 O(n) 시간복잡도로 두 수의 합을 찾습니다. 각 단계에서 complement를 계산하고 맵에서 찾아보며, 없으면 현재 값을 저장합니다.",
  },
  output: {
    title: "4. 결과 출력",
    code: `// 결과 처리 및 출력
function formatOutput(result, arr, target) {
    if (result.length === 0) {
        return "해답을 찾을 수 없습니다.";
    }
    
    const [index1, index2] = result;
    const value1 = arr[index1];
    const value2 = arr[index2];
    
    return {
        indices: result,
        values: [value1, value2],
        sum: value1 + value2,
        verification: value1 + value2 === target
    };
}

const output = formatOutput(result, arr, target);
console.log('결과 인덱스:', output.indices);
console.log('결과 값들:', output.values);
console.log('합계:', output.sum);
console.log('검증:', output.verification);

// 최종 출력
console.log(\`Answer: [\${output.indices.join(', ')}]\`);`,
    explanation:
      "알고리즘의 결과를 검증하고 요구사항에 맞는 형태로 출력합니다. 인덱스와 실제 값들을 확인하고, 합이 목표값과 일치하는지 검증합니다.",
  },
};


