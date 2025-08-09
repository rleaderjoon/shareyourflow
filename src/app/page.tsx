"use client"
import { useState } from "react";
import { Button } from "../components/ui/button";
import { AlgorithmCard } from "../components/AlgorithmCard";
import { LoginPage } from "../components/LoginPage";

const algorithmData = [
  {
    title: "Two Sum - 해시맵을 이용한 최적화 풀이",
    author: "김개발",
    language: "Python",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "브루트포스 방식 대신 해시맵을 활용하여 시간복잡도를 O(n²)에서 O(n)으로 개선한 풀이입니다. 각 원소를 순회하면서 target에서 현재 값을 뺀 값이 해시맵에 존재하는지 확인하는 방식으로 해결했습니다.",
    tags: ["Array", "Hash Table", "Two Pointers"],
    likes: 127,
    timeAgo: "2시간 전"
  },
  {
    title: "Longest Palindromic Substring - Manacher's Algorithm",
    author: "박알고",
    language: "C++",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "일반적인 중앙 확장 방법은 O(n²)의 시간복잡도를 가지지만, Manacher's Algorithm을 사용하면 O(n)에 해결할 수 있습니다. 이전에 계산된 팰린드롬 정보를 활용하여 중복 계산을 줄이는 것이 핵심입니다.",
    tags: ["String", "Dynamic Programming", "Manacher"],
    likes: 89,
    timeAgo: "4시간 전"
  },
  {
    title: "Binary Tree Maximum Path Sum - DFS 재귀 접근",
    author: "이코딩",
    language: "Java",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "각 노드에서 최대 경로 합을 구하는 문제입니다. DFS를 사용하여 각 노드에서 가능한 최대 경로를 계산하되, 부모 노드에게는 한쪽 방향의 최대값만 반환하는 것이 포인트입니다. 글로벌 최댓값을 별도로 관리해야 합니다.",
    tags: ["Tree", "DFS", "Recursion", "Path Sum"],
    likes: 156,
    timeAgo: "6시간 전"
  },
  {
    title: "Sliding Window Maximum - Deque 최적화",
    author: "최효율",
    language: "JavaScript",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    description: "단순한 방법으로는 각 윈도우마다 최댓값을 찾아 O(nk)가 되지만, Deque를 사용하면 O(n)으로 최적화할 수 있습니다. Deque에는 윈도우 내에서 잠재적으로 최댓값이 될 수 있는 원소들의 인덱스만 저장합니다.",
    tags: ["Array", "Sliding Window", "Deque", "Monotonic Queue"],
    likes: 203,
    timeAgo: "8시간 전"
  },
  {
    title: "Merge K Sorted Lists - 우선순위 큐 활용",
    author: "정정렬",
    language: "Python",
    difficulty: "Hard",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    description: "k개의 정렬된 연결리스트를 하나로 합치는 문제입니다. 모든 리스트의 헤드를 우선순위 큐에 넣고, 가장 작은 값을 계속 꺼내면서 결과 리스트를 만들어가는 방식으로 해결했습니다.",
    tags: ["Linked List", "Heap", "Priority Queue", "Merge"],
    likes: 178,
    timeAgo: "12시간 전"
  },
  {
    title: "Word Ladder - BFS 최단경로 탐색",
    author: "강그래프",
    language: "Go",
    difficulty: "Hard",
    timeComplexity: "O(M² × N)",
    spaceComplexity: "O(M² × N)",
    description: "단어 변환 최단경로를 찾는 문제입니다. 각 단어를 그래프의 노드로 보고, 한 글자만 다른 단어들을 인접 노드로 연결한 후 BFS로 최단경로를 찾습니다. 양방향 BFS를 사용하면 더욱 최적화할 수 있습니다.",
    tags: ["BFS", "Graph", "String", "Shortest Path"],
    likes: 134,
    timeAgo: "1일 전"
  },
  {
    title: "LRU Cache - 해시맵과 더블링크드리스트",
    author: "캐시마스터",
    language: "Python",
    difficulty: "Medium",
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    description: "LRU 캐시를 구현하는 문제입니다. 해시맵으로 O(1) 접근을 보장하고, 더블링크드리스트로 O(1) 삽입/삭제를 구현했습니다. 가장 최근 사용된 노드를 head 쪽으로, 가장 오래된 노드를 tail 쪽으로 관리합니다.",
    tags: ["Hash Table", "Linked List", "Design"],
    likes: 245,
    timeAgo: "1일 전"
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    author: "트리장인",
    language: "Java",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "이진트리를 문자열로 직렬화하고 다시 복원하는 문제입니다. 전위순회를 사용해 직렬화하고, null 노드를 특수문자로 표현합니다. 재귀를 통해 문자열을 파싱하며 트리를 복원합니다.",
    tags: ["Tree", "DFS", "BFS", "String", "Design"],
    likes: 156,
    timeAgo: "2일 전"
  },
  {
    title: "Regular Expression Matching - DP 접근",
    author: "정규식달인",
    language: "C++",
    difficulty: "Hard",
    timeComplexity: "O(m×n)",
    spaceComplexity: "O(m×n)",
    description: "정규식 패턴 매칭을 동적계획법으로 해결합니다. '*'는 앞 문자를 0개 이상, '.'는 임의의 한 문자를 의미합니다. 2차원 DP 테이블을 사용해 각 위치에서의 매칭 여부를 저장합니다.",
    tags: ["String", "Dynamic Programming", "Recursion"],
    likes: 198,
    timeAgo: "2일 전"
  },
  {
    title: "Median of Two Sorted Arrays - Binary Search",
    author: "이분탐색왕",
    language: "Python",
    difficulty: "Hard",
    timeComplexity: "O(log(min(m,n)))",
    spaceComplexity: "O(1)",
    description: "두 정렬된 배열에서 중앙값을 찾는 문제입니다. 합친 후 정렬하면 O((m+n)log(m+n))이지만, 이분탐색을 사용하면 O(log(min(m,n)))으로 최적화할 수 있습니다. 작은 배열에서 partition을 찾는 것이 핵심입니다.",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    likes: 287,
    timeAgo: "3일 전"
  },
  {
    title: "Trapping Rain Water - Two Pointer 기법",
    author: "물수영",
    language: "JavaScript",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "높이 배열에서 빗물이 고이는 양을 계산하는 문제입니다. 두 포인터를 양끝에서 시작해 안쪽으로 이동하며, 각 위치에서 고일 수 있는 물의 양을 계산합니다. 현재까지의 최대 높이를 추적하는 것이 중요합니다.",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    likes: 342,
    timeAgo: "3일 전"
  },
  {
    title: "Smallest Range Covering K Lists - Heap",
    author: "범위찾기",
    language: "Java",
    difficulty: "Hard",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    description: "k개의 정렬된 리스트에서 각 리스트의 원소를 하나씩 포함하는 최소 범위를 찾는 문제입니다. 최소힙을 사용해 현재 가장 작은 값을 추적하고, 최대값도 함께 유지하며 범위를 계산합니다.",
    tags: ["Array", "Hash Table", "Greedy", "Sliding Window", "Sorting", "Heap"],
    likes: 167,
    timeAgo: "4일 전"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login'>('home');

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <LoginPage onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light tracking-wider">shareyourflow</h1>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8 font-light">
                <button className="hover:text-gray-600">문제</button>
                <button className="hover:text-gray-600">풀이</button>
                <button className="hover:text-gray-600">토론</button>
                <button className="hover:text-gray-600">랭킹</button>
              </nav>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-none font-light"
                >
                  풀이 작성
                </Button>
                <Button 
                  onClick={handleLoginClick}
                  className="bg-black text-white hover:bg-gray-800 rounded-none font-light"
                >
                  로그인
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-light mb-4 tracking-wide">
            알고리즘 풀이를 공유하고<br />
            함께 성장하세요
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl leading-relaxed">
            개발자들이 다양한 알고리즘 문제 해결 과정을 공유하고,
            효율적인 코드와 아이디어를 주고받는 공간입니다.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12 pb-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="font-light text-gray-600">정렬:</span>
                <select className="bg-transparent border-b border-gray-300 font-light focus:border-black focus:outline-none">
                  <option>최신순</option>
                  <option>인기순</option>
                  <option>좋아요순</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-light text-gray-600">난이도:</span>
                <select className="bg-transparent border-b border-gray-300 font-light focus:border-black focus:outline-none">
                  <option>전체</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-light text-gray-600">언어:</span>
                <select className="bg-transparent border-b border-gray-300 font-light focus:border-black focus:outline-none">
                  <option>전체</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>JavaScript</option>
                </select>
              </div>
            </div>
            <div className="text-sm font-light text-gray-600">
              총 {algorithmData.length}개의 풀이
            </div>
          </div>
        </div>

        {/* Algorithm Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {algorithmData.map((algorithm, index) => (
            <AlgorithmCard
              key={index}
              {...algorithm}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white rounded-none font-light px-12"
          >
            더 많은 풀이 보기
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-12 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-light mb-4">shareyourflow</h3>
              <p className="text-sm font-light text-gray-600 max-w-md leading-relaxed">
                알고리즘 문제 해결 경험을 공유하고,<br />
                더 나은 개발자로 성장할 수 있도록 돕습니다.
              </p>
            </div>
            <div className="flex gap-16 text-sm font-light text-gray-600">
              <div>
                <h4 className="text-black mb-3">커뮤니티</h4>
                <div className="space-y-2">
                  <button className="block hover:text-black">문제 찾기</button>
                  <button className="block hover:text-black">풀이 공유</button>
                  <button className="block hover:text-black">토론 참여</button>
                </div>
              </div>
              <div>
                <h4 className="text-black mb-3">도움말</h4>
                <div className="space-y-2">
                  <button className="block hover:text-black">사용 가이드</button>
                  <button className="block hover:text-black">FAQ</button>
                  <button className="block hover:text-black">고객지원</button>
                </div>
              </div>
              <div>
                <h4 className="text-black mb-3">정보</h4>
                <div className="space-y-2">
                  <button className="block hover:text-black">개인정보처리방침</button>
                  <button className="block hover:text-black">서비스 약관</button>
                  <button className="block hover:text-black">회사 소개</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 mt-8">
            <p className="text-sm font-light text-gray-600">
              © 2025 shareyourflow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}