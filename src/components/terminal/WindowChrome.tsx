"use client";

import { ReactNode } from "react";

export function WindowChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-[10px] shadow-2xl border border-gray-300/60 overflow-hidden backdrop-blur-sm h-full">
      <div className="border border-white/50 rounded-[9px] overflow-hidden flex flex-col h-full">
        <div className="relative flex items-center justify-between px-4 py-2 bg-gradient-to-b from-gray-50 to-gray-200 border-b border-gray-300/50">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="relative flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
            <div className="w-3 h-3 rounded-full bg-green-500/90" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-700 font-medium">{title}</div>
          <div className="w-16" />
        </div>
        <div className="bg-white flex-1 min-h-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default WindowChrome;


