export interface SectionEntry {
  title: string;
  code: string;
  explanation: string;
}

export const sectionContent: Record<string, SectionEntry> = {
  input: {
    title: "1. 입력",
    code: `// C++: 별 찍기 - 10 (BOJ 2447), 예시 N = 27
#include <bits/stdc++.h>
using namespace std;

int N = 27; // 문제에서 N은 3^k, 여기서는 시연을 위해 27로 고정
`,
    explanation:
      "N은 3의 거듭제곱입니다. 테스트를 위해 N=27로 고정합니다.",
  },
  array: {
    title: "2. 초기화",
    code: `// N x N 보드를 '*'로 채워 시작
vector<string> board;

void initBoard(int n) {
  board.assign(n, string(n, '*'));
}

// 초기화
// initBoard(N);`,
    explanation:
      "N×N 보드를 '*'로 채워 시작합니다. 중앙을 비우는 재귀를 적용하기 전의 기본 상태입니다.",
  },
  dp: {
    title: "3. 분할정복",
    code: `// 가운데 (n/3) 정사각형을 공백으로 비우고
// 3x3 블록 중 가운데를 제외한 8개 영역에 대해 재귀 수행
void carve(int x, int y, int n) {
  if (n == 1) return;
  int m = n / 3;
  // 가운데 비우기
  for (int i = x + m; i < x + 2*m; ++i) {
    for (int j = y + m; j < y + 2*m; ++j) {
      board[i][j] = ' ';
    }
  }
  // 3x3 하위 블록 순회 (가운데 제외)
  for (int dx = 0; dx < 3; ++dx) {
    for (int dy = 0; dy < 3; ++dy) {
      if (dx == 1 && dy == 1) continue; // 가운데 블록 스킵
      carve(x + dx*m, y + dy*m, m);
    }
  }
}

// initBoard(N);
// carve(0, 0, N);`,
    explanation:
      "크기 n 보드의 중앙 (n/3) 정사각형을 공백으로 만들고, 가장자리를 구성하는 8개의 (n/3) 크기 보드에 대해 재귀적으로 동일한 작업을 수행합니다.",
  },
  output: {
    title: "4. 출력",
    code: `int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  // 입력은 보통 cin >> N; 이지만, 데모에서는 N=27 고정
  initBoard(N);
  carve(0, 0, N);

  for (int i = 0; i < N; ++i) {
    cout << board[i] << "\n";
  }
  return 0;
}
`,
    explanation:
      "초기화 후 carve를 적용하고 완성된 보드를 출력합니다.",
  },
};


