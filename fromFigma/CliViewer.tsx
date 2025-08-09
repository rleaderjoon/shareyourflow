"use client";

import * as React from "react";

type Checkpoint = {
  id: string;
  line: number; // 1-based line number
  title: string;
  description: string;
};

export interface CliViewerProps {
  problemTitle: string;
  code: string; // full code as a single string
  checkpoints: Checkpoint[];
}

export function CliViewer({ problemTitle, code, checkpoints }: CliViewerProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const lines = React.useMemo(() => code.split(/\r?\n/), [code]);

  const current = checkpoints[currentIndex] ?? null;

  const goPrev = () => setCurrentIndex((idx) => Math.max(0, idx - 1));
  const goNext = () => setCurrentIndex((idx) => Math.min(checkpoints.length - 1, idx + 1));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
        </div>
        <h1 className="text-sm tracking-wider text-neutral-300">{problemTitle}</h1>
        <div className="text-xs text-neutral-600">CLI Viewer</div>
      </header>

      {/* Body */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Code area */}
        <section className="lg:col-span-8 border-r border-neutral-800 overflow-auto">
          <pre className="p-6 text-[13px] leading-6">
            {lines.map((text, idx) => {
              const lineNumber = idx + 1;
              const isActive = current && lineNumber === current.line;
              return (
                <div
                  key={idx}
                  className={`grid grid-cols-[56px_1fr] items-start ${
                    isActive ? "bg-neutral-900" : ""
                  }`}
                >
                  <span className={`pr-4 text-right select-none ${isActive ? "text-emerald-400" : "text-neutral-600"}`}>
                    {lineNumber.toString().padStart(3, " ")}
                  </span>
                  <code className={isActive ? "text-neutral-100" : "text-neutral-300"}>{text || "\u00A0"}</code>
                </div>
              );
            })}
          </pre>
        </section>

        {/* Side panel */}
        <aside className="lg:col-span-4 h-full flex flex-col">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-neutral-200 text-sm">구분점</h2>
            <p className="text-neutral-500 text-xs mt-1">총 {checkpoints.length}개</p>
          </div>

          <div className="flex-1 overflow-auto divide-y divide-neutral-900">
            {checkpoints.map((cp, i) => (
              <button
                key={cp.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-full text-left px-6 py-4 hover:bg-neutral-900/60 ${
                  i === currentIndex ? "bg-neutral-900" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${i === currentIndex ? "text-emerald-400" : "text-neutral-400"}`}>
                    L{cp.line}
                  </span>
                  <span className="text-[10px] text-neutral-500">#{i + 1}</span>
                </div>
                <div className="mt-1 text-sm text-neutral-200">{cp.title}</div>
                <p className="mt-1 text-xs text-neutral-400 leading-5">{cp.description}</p>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-neutral-800 flex items-center justify-between gap-2">
            <button
              onClick={goPrev}
              className="px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded"
              disabled={currentIndex === 0}
            >
              Prev
            </button>
            <div className="text-xs text-neutral-500">
              {currentIndex + 1} / {checkpoints.length}
            </div>
            <button
              onClick={goNext}
              className="px-3 py-2 text-xs bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded"
              disabled={currentIndex === checkpoints.length - 1}
            >
              Next
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default CliViewer;


