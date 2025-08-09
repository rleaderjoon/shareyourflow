"use client";

export type StepItem = {
  id: string; // 'input' | 'array' | 'dp' | 'output'
  label: string;
  startLine: number;
};

export function StepsPanel({ steps, activeStepId, onSelect }: { steps: StepItem[]; activeStepId?: string; onSelect?: (id: string) => void }) {
  return (
    <div className="p-4">
      <div className="text-sm font-medium text-neutral-800 mb-3">단계</div>
      <div className="space-y-2">
        {steps.map((s) => (
          (() => {
            const isActive = activeStepId === s.id;
            return (
              <button
                type="button"
                onClick={() => onSelect?.(s.id)}
                key={s.id}
                className={`w-full text-left flex items-center justify-between rounded border border-neutral-200 px-3 py-2 transition-colors ${
                  isActive ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <div className={`text-sm ${isActive ? 'text-white' : 'text-neutral-900'}`}>{s.label}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-neutral-600'}`}>시작 L{s.startLine}</div>
              </button>
            );
          })()
        ))}
      </div>
    </div>
  );
}

export default StepsPanel;


