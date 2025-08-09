"use client";

import { useEffect, useState } from "react";

export function TimelinePanel({ active, onActivate }: { active: boolean; onActivate: () => void }) {
  const [cursor, setCursor] = useState(0);

  const steps = [
    { t: 0, label: "프로그램 시작" },
    { t: 1, label: "입력 파싱" },
    { t: 2, label: "자료구조 초기화" },
    { t: 3, label: "루프 1" },
    { t: 4, label: "루프 2" },
    { t: 5, label: "정답 도출" },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "ArrowLeft") setCursor((c) => Math.max(0, c - 1));
      if (e.key === "ArrowRight") setCursor((c) => Math.min(steps.length - 1, c + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steps.length, active]);

  return (
    <div onClick={onActivate} className={`border border-neutral-300 rounded-md bg-white/70 backdrop-blur p-4 ${active ? 'ring-2 ring-neutral-900' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-neutral-800">단계</div>
        <div className="text-xs text-neutral-600">{active ? '활성화됨' : '클릭하여 활성화'}</div>
      </div>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setCursor(i)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              i === cursor ? "bg-neutral-900 text-white" : "bg-white text-neutral-800 hover:bg-neutral-100"
            }`}
          >
            <span className="text-xs w-10 text-left text-neutral-500">t={s.t}</span>
            <span className="text-sm">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimelinePanel;


