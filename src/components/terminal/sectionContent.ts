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
  const n = parseInt(input.trim(), 10);
  return { n };
}

// 예시 입력: 줄 수 N
const input = \`5\`;

const { n } = parseInput(input);
console.log('라인 수:', n);`,
    explanation:
      "별찍기 삼각형을 그릴 라인 수 N을 파싱합니다. 입력은 한 줄 정수입니다.",
  },
  array: {
    title: "2. 자료구조 초기화",
    code: `// 출력 라인을 담을 배열 준비
function initialize(n) {
  // lines: 각 행의 문자열을 담는 1차원 배열
  const lines = new Array(n).fill("");
  return { lines };
}

const { lines } = initialize(n);
console.log('초기 lines:', lines);`,
    explanation:
      "별 삼각형을 문자열로 담을 1차원 배열을 준비합니다. 각 인덱스가 한 줄을 의미합니다.",
  },
  dp: {
    title: "3. 구현",
    code: `// 별찍기: 왼쪽 정렬 삼각형(높이 n)
function buildTriangle(n, lines) {
  for (let i = 1; i <= n; i++) {
    lines[i - 1] = '*'.repeat(i);
    // 진행 상황 출력
    console.log(\`line \${i}: \${lines[i - 1]}\`);
  }
  return lines;
}

const resultLines = buildTriangle(n, lines);`,
    explanation:
      "1부터 N까지 반복하며 i번째 줄에 '*'를 i개 채워 왼쪽 정렬 삼각형을 만듭니다.",
  },
  output: {
    title: "4. 결과 출력",
    code: `// 결과 출력
function printLines(lines) {
  const out = lines.join('\n');
  console.log(out);
  return out;
}

const output = printLines(resultLines);`,
    explanation:
      "조립된 문자열 배열을 줄바꿈으로 연결해 콘솔로 출력합니다.",
  },
};


