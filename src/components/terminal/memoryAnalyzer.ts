export type SceneCell = {
  id: string;
  position: [number, number, number];
  value: string | number | null;
  state?: "default" | "active" | "visited" | "result";
};

export type SceneSpec = {
  kind: "array1D" | "array2D" | "array3D" | "tree" | "graph" | "unknown";
  dimensions: [number, number, number];
  cells: SceneCell[];
};

// 아주 간단한 휴리스틱 기반 감지기: 배열/2D/3D/트리
export function analyzeMemoryFromCode(code: string): SceneSpec {
  const trimmed = code.replace(/\s+/g, " ");

  // 3D 배열 패턴: new Array(x).fill(0).map(...new Array(y)... new Array(z)) 등
  const is3D = /new\s+Array\s*\(\s*\w+\s*\)\.fill\([^)]*\)\.map\(.*new\s+Array\s*\(.*\)\.fill\([^)]*\)\.map\(.*new\s+Array/i.test(trimmed);
  if (is3D) {
    const X = 4, Y = 3, Z = 2;
    return {
      kind: "array3D",
      dimensions: [X, Y, Z],
      cells: buildGrid(X, Y, Z),
    };
  }

  // 2D 배열 패턴: Array.from({length:x}, ... new Array(y)) 또는 중첩 배열 리터럴
  const is2D = /Array\.from\(\{\s*length\s*:\s*\w+\s*\}.*new\s+Array\s*\(\s*\w+\s*\)\.fill/i.test(trimmed) || /\[[^\]]*\[[^\]]*\]/.test(code);
  if (is2D) {
    const X = 6, Y = 4;
    return {
      kind: "array2D",
      dimensions: [X, Y, 1],
      cells: buildGrid(X, Y, 1),
    };
  }

  // 1D 배열 패턴: [] 리터럴 또는 new Array(n)
  const is1D = /\[[^\]]*\]/.test(code) || /new\s+Array\s*\(\s*\w+\s*\)/.test(code);
  if (is1D) {
    const N = 8;
    return {
      kind: "array1D",
      dimensions: [N, 1, 1],
      cells: buildGrid(N, 1, 1),
    };
  }

  // 트리 패턴: TreeNode, left/right, children 등 키워드 휴리스틱
  const isTree = /TreeNode|left\s*:|right\s*:|children\s*:/i.test(code) || /node\.left|node\.right/.test(code);
  if (isTree) {
    // 간단한 완전이진트리 형태의 데모 스펙
    const cells: SceneCell[] = [];
    const levels = 3;
    let id = 0;
    for (let d = 0; d < levels; d++) {
      const width = 2 ** d;
      for (let i = 0; i < width; i++) {
        cells.push({ id: `n-${id++}`, position: [i - (width - 1) / 2, d, 0], value: null });
      }
    }
    return { kind: "tree", dimensions: [1, levels, 1], cells };
  }

  return { kind: "unknown", dimensions: [1, 1, 1], cells: [] };
}

function buildGrid(X: number, Y: number, Z: number): SceneCell[] {
  const cells: SceneCell[] = [];
  let v = 0;
  for (let z = 0; z < Z; z++) {
    for (let y = 0; y < Y; y++) {
      for (let x = 0; x < X; x++) {
        cells.push({ id: `${x}-${y}-${z}`, position: [x, y, z], value: v++ });
      }
    }
  }
  return cells;
}


