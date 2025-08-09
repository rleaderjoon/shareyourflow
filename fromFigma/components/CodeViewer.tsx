import { useState } from "react";

interface CodeSection {
  title: string;
  content: string;
  language?: string;
}

export function CodeViewer() {
  const [currentSection, setCurrentSection] = useState<'problem' | 'solution' | 'explanation'>('problem');

  const sections: Record<string, CodeSection> = {
    problem: {
      title: "문제 설명",
      content: `// 두 수의 합 (Two Sum)
// 
// 정수 배열 nums와 정수 target이 주어졌을 때,
// 합이 target이 되는 두 개의 원소의 인덱스를 반환하세요.
//
// 예제:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// 설명: nums[0] + nums[1] = 2 + 7 = 9

function twoSum(nums, target) {
  // 여기에 해답을 구현하세요
}`,
      language: "javascript"
    },
    solution: {
      title: "해결책",
      content: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// 시간 복잡도: O(n)
// 공간 복잡도: O(n)`,
      language: "javascript"
    },
    explanation: {
      title: "해설",
      content: `# 알고리즘 해설

## 접근 방법
1. 해시맵(Map)을 사용하여 한 번의 순회로 해결
2. 각 원소에 대해 target - 현재원소 = complement 계산
3. complement가 해시맵에 있는지 확인
4. 있다면 해당 인덱스와 현재 인덱스 반환
5. 없다면 현재 원소와 인덱스를 해시맵에 저장

## 핵심 아이디어
- 브루트포스: O(n²) → 해시맵 활용: O(n)으로 최적화
- 공간을 사용해서 시간을 단축시키는 전형적인 트레이드오프

## 예제 실행 과정
nums = [2,7,11,15], target = 9

i=0: complement=7, map={}, map에 2 저장
i=1: complement=2, map에서 2 발견! → [0,1] 반환`,
      language: "markdown"
    }
  };

  const menuItems = [
    { key: 'problem' as const, label: 'cat problem.js', color: 'text-yellow-400' },
    { key: 'solution' as const, label: 'cat solution.js', color: 'text-green-400' },
    { key: 'explanation' as const, label: 'cat README.md', color: 'text-blue-400' }
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Navigation */}
      <div className="px-4 py-2 border-b border-gray-700">
        <div className="flex gap-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentSection(item.key)}
              className={`text-sm font-mono transition-colors ${
                currentSection === item.key 
                  ? item.color 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-2">
          <span className="text-gray-400 text-sm font-mono">
            # {sections[currentSection].title}
          </span>
        </div>
        <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap leading-relaxed">
          {sections[currentSection].content}
        </pre>
      </div>
    </div>
  );
}