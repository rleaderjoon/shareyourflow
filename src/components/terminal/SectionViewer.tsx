"use client";

import { useState, useMemo, useEffect } from "react";
import { sectionContent as sharedContent } from "./sectionContent";
import type { ReactElement } from "react";

interface SectionContent {
  [key: string]: {
    title: string;
    code: string;
    explanation: string;
  };
}

export function SectionViewer({ section, onBack, active = true }: { section: string; onBack: () => void; active?: boolean }) {
  const [showExplanation, setShowExplanation] = useState(false);

  const sectionContent: SectionContent = useMemo(() => sharedContent, []);

  const content = sectionContent[section];

  // 키보드: Escape = 뒤로, Tab = 코드/설명 토글
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!active) return;
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onBack();
          break;
        case "Tab":
          e.preventDefault();
          setShowExplanation((prev) => !prev);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack, active]);

  // 심플한 JS 하이라이터 (회색 톤)
  const renderHighlighted = (source: string) => {
    const keywordPattern = /\b(function|const|let|var|return|if|else|for|while|switch|case|break|continue|new|class|extends|import|from|export|default|try|catch|finally|throw)\b/g;
    const numberPattern = /\b(0x[\da-fA-F]+|\d+(?:\.\d+)?)\b/g;
    const stringPattern = /(["'`])(?:\\.|(?!\1).)*\1/g;

    return source.split(/\n/).map((line, idx) => {
      // 주석 처리
      const commentIndex = line.indexOf("//");
      const codePart = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
      const commentPart = commentIndex >= 0 ? line.slice(commentIndex) : "";

      // 문자열 먼저 래핑하여 보호
      const stringWrapped: Array<string | ReactElement> = [];
      let lastIndex = 0;
      codePart.replace(stringPattern, (match, _q, offset) => {
        if (lastIndex < offset) {
          stringWrapped.push(codePart.slice(lastIndex, offset));
        }
        stringWrapped.push(
          <span key={`s-${idx}-${offset}`} className="text-neutral-700 italic">
            {match}
          </span>
        );
        lastIndex = offset + String(match).length;
        return match as string;
      });
      if (lastIndex < codePart.length) {
        stringWrapped.push(codePart.slice(lastIndex));
      }

      // 키워드/숫자 하이라이트
      const keywordNumberWrapped = stringWrapped.flatMap((chunk, cIdx) => {
        if (typeof chunk !== "string") return [chunk];
        const parts: Array<string | ReactElement> = [];
        let text = chunk;
        // 키워드
        text = text.replace(keywordPattern, (m) => `\u0001${m}\u0001`);
        // 숫자
        text = text.replace(numberPattern, (m) => `\u0002${m}\u0002`);

        const tokens = text.split(/(\u0001|\u0002)/);
        let mode: null | "kw" | "num" = null;
        for (const t of tokens) {
          if (t === "\u0001") {
            mode = mode === null ? "kw" : null;
            continue;
          }
          if (t === "\u0002") {
            mode = mode === null ? "num" : null;
            continue;
          }
          if (!t) continue;
          if (mode === "kw") {
            parts.push(
              <span key={`k-${idx}-${cIdx}-${parts.length}`} className="text-neutral-900 font-medium">
                {t}
              </span>
            );
          } else if (mode === "num") {
            parts.push(
              <span key={`n-${idx}-${cIdx}-${parts.length}`} className="text-neutral-800">
                {t}
              </span>
            );
          } else {
            parts.push(t);
          }
        }
        return parts;
      });

      return (
        <div key={idx} className="grid grid-cols-[56px_1fr]">
          <span className="pr-4 text-right select-none text-neutral-500">{String(idx + 1).padStart(3, " ")}</span>
          <code className="text-neutral-900">
            {keywordNumberWrapped}
            {commentPart && <span className="text-neutral-500">{commentPart}</span>}
          </code>
        </div>
      );
    });
  };

  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-neutral-900 text-sm font-mono mb-2">$ cat {section}.js</div>
        <div className="text-neutral-700 text-sm font-mono">
          Press Tab to toggle explanation, Space to skip typing, Escape to go back
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-mono text-neutral-900 mb-4">{content.title}</h2>
        {!showExplanation ? (
          <pre className="text-sm font-mono whitespace-pre leading-7 overflow-auto">
            {renderHighlighted(content.code)}
          </pre>
        ) : (
          <div className="text-sm text-neutral-800 leading-relaxed">
            <div className="mb-3 font-mono text-neutral-700"># 설명</div>
            <p className="whitespace-pre-wrap">{content.explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-neutral-700 text-sm font-mono">
        {showExplanation ? "Tab: Show Code" : "Tab: Show Explanation"} • Space: Skip • Escape: Back to Menu
      </div>
    </div>
  );
}

export default SectionViewer;


