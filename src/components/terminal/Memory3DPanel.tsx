"use client";

import { useEffect, useMemo, useState } from "react";
import { analyzeMemoryFromCode, SceneSpec } from "./memoryAnalyzer";
import useAiScene from "./useAiScene";

type Cell = {
  id: string;
  x: number;
  y: number;
  z: number;
  value: string;
};

export function Memory3DPanel({ active, onActivate, sourceCode, steps }: { active: boolean; onActivate: () => void; sourceCode?: string; steps?: Array<{id:string; label:string; description?: string}> }) {
  // 데모용 3D 메모리 격자 (하드코딩)
  const cells = useMemo<Cell[]>(() => {
    const items: Cell[] = [];
    const sizeX = 6;
    const sizeY = 4;
    const sizeZ = 2;
    let counter = 0;
    for (let z = 0; z < sizeZ; z++) {
      for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
          items.push({ id: `${x}-${y}-${z}`, x, y, z, value: String(counter++) });
        }
      }
    }
    return items;
  }, []);

  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "ArrowUp") setFocusIndex((i) => Math.max(0, i - 6));
      if (e.key === "ArrowDown") setFocusIndex((i) => Math.min(cells.length - 1, i + 6));
      if (e.key === "ArrowLeft") setFocusIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setFocusIndex((i) => Math.min(cells.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cells.length, active]);

  // 간단 분석 결과(데모): 소스코드가 주어지면 분석, 없으면 기본 격자
  const scene = useAiScene({ filename: undefined, code: sourceCode ?? "", steps: steps ?? [] });
  const spec: SceneSpec = useMemo(() => {
    const aiSpec = scene.data?.scenes?.[0];
    if (aiSpec && aiSpec.cells?.length) return aiSpec as unknown as SceneSpec;
    if (sourceCode) return analyzeMemoryFromCode(sourceCode);
    return {
      kind: "array2D",
      dimensions: [6, 4, 1],
      cells: cells.map((c) => ({ id: c.id, position: [c.x, c.y, c.z], value: c.value })),
    } as unknown as SceneSpec;
  }, [scene.data, sourceCode, cells]);

  return (
    <div onClick={onActivate} className={`border border-neutral-300 rounded-md bg-white/70 backdrop-blur p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-neutral-800">메모리 시각화 ({spec.kind})</div>
        <div className="text-xs text-neutral-600">{active ? '활성화됨' : '클릭하여 활성화'}</div>
      </div>
      <div className="perspective-[800px]">
        <div className="relative mx-auto h-52 w-full max-w-sm [transform-style:preserve-3d] rotate-x-45 -rotate-y-12">
          {spec.cells.map((cell, idx) => (
            <div
              key={cell.id}
              className={`absolute h-8 w-10 flex items-center justify-center text-xs rounded shadow-sm border ${
                idx === focusIndex
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-800 border-neutral-300"
              }`}
              style={{
                transform:
                  `translate3d(${cell.position[0] * 28}px, ${cell.position[1] * 28}px, ${-cell.position[2] * 40}px)`,
              }}
            >
              {String(cell.value ?? '')}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-xs text-neutral-700">
        {scene.loading ? "AI 분석 중..." : scene.error ? `분석 오류: ${scene.error}` : "2D/3D 좌표로 메모리 구조를 요약해 보여줍니다."}
      </div>
    </div>
  );
}

export default Memory3DPanel;


