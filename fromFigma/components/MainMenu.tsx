import { useState, useEffect } from 'react';

interface MenuState {
  currentIndex: number;
  selectedSection: string | null;
}

interface MenuItem {
  id: string;
  label: string;
  description: string;
}

export function MainMenu({ onSectionSelect }: { onSectionSelect: (section: string) => void }) {
  const [menuState, setMenuState] = useState<MenuState>({
    currentIndex: 0,
    selectedSection: null
  });

  const menuItems: MenuItem[] = [
    { id: 'input', label: '1. 입력', description: '문제 입력 처리 및 파싱' },
    { id: 'array', label: '2. 배열 생성', description: '자료구조 초기화 및 설정' },
    { id: 'dp', label: '3. DP', description: '동적 프로그래밍 알고리즘' },
    { id: 'output', label: '4. 출력', description: '결과 계산 및 출력' }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setMenuState(prev => ({
            ...prev,
            currentIndex: Math.max(0, prev.currentIndex - 1)
          }));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setMenuState(prev => ({
            ...prev,
            currentIndex: Math.min(menuItems.length - 1, prev.currentIndex + 1)
          }));
          break;
        case 'Enter':
          e.preventDefault();
          const selectedItem = menuItems[menuState.currentIndex];
          onSectionSelect(selectedItem.id);
          break;
        case 'Escape':
          e.preventDefault();
          onSectionSelect('');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuState.currentIndex, onSectionSelect, menuItems]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-gray-700 text-sm font-mono">
        <div>$ ./algorithm_viewer</div>
        <div className="mt-2 text-gray-500">Use ↑↓ arrows to navigate, Enter to select, Escape to go back</div>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center p-3 font-mono transition-colors ${
              index === menuState.currentIndex
                ? 'text-black'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {index === menuState.currentIndex && <span className="text-gray-800">▶</span>}
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1 ml-4">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm font-mono">
        Press Enter to explore algorithm steps
      </div>
    </div>
  );
}