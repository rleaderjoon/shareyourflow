"use client";

import { useState, useEffect, useMemo } from "react";

interface MenuState {
  currentIndex: number;
  selectedSection: string | null;
}

interface MenuItem {
  id: string;
  label: string;
  description: string;
}

export function MainMenu({ onSectionSelect, active }: { onSectionSelect: (section: string) => void; active: boolean }) {
  const [menuState, setMenuState] = useState<MenuState>({
    currentIndex: 0,
    selectedSection: null,
  });

  const menuItems: MenuItem[] = useMemo(
    () => [
      { id: "input", label: "1. 입력", description: "문제 입력 처리 및 파싱" },
      { id: "array", label: "2. 배열 생성", description: "자료구조 초기화 및 설정" },
      { id: "dp", label: "3. DP", description: "동적 프로그래밍 알고리즘" },
      { id: "output", label: "4. 출력", description: "결과 계산 및 출력" },
    ],
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!active) return;
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setMenuState((prev) => ({ ...prev, currentIndex: Math.max(0, prev.currentIndex - 1) }));
          break;
        case "ArrowDown":
          e.preventDefault();
          setMenuState((prev) => ({
            ...prev,
            currentIndex: Math.min(menuItems.length - 1, prev.currentIndex + 1),
          }));
          break;
        case "Enter":
          e.preventDefault();
          onSectionSelect(menuItems[menuState.currentIndex].id);
          break;
        case "Escape":
          e.preventDefault();
          onSectionSelect("");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuItems, menuState.currentIndex, onSectionSelect, active]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-neutral-800 text-sm font-mono">
        <div>$ ./algorithm_viewer</div>
        <div className="mt-2 text-neutral-600">Use ↑↓ arrows to navigate, Enter to select, Escape to go back</div>
      </div>

      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center p-3 font-mono transition-colors ${
              index === menuState.currentIndex ? "text-black" : "text-neutral-600 hover:text-neutral-800"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {index === menuState.currentIndex && <span className="text-neutral-900">▶</span>}
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="text-sm text-neutral-700 mt-1 ml-4">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-neutral-700 text-sm font-mono">Press Enter to explore algorithm steps</div>
    </div>
  );
}

export default MainMenu;


