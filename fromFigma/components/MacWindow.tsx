import { ReactNode } from 'react';
import { MacWindowHeader } from './MacWindowHeader';

export function MacWindow({ 
  children, 
  title 
}: { 
  children: ReactNode; 
  title?: string; 
}) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Main Window Container with enhanced styling */}
      <div className="bg-white rounded-[10px] shadow-2xl border border-gray-300/60 overflow-hidden backdrop-blur-sm">
        {/* Inner border for depth */}
        <div className="border border-white/50 rounded-[9px] overflow-hidden">
          {/* Window Header */}
          <MacWindowHeader title={title} />
          
          {/* Window Content */}
          <div className="bg-yellow-50 border-t border-gray-200/50">
            {children}
          </div>
        </div>
      </div>
      
      {/* Enhanced Window Shadow */}
      <div className="relative">
        {/* Primary shadow */}
        <div className="absolute inset-x-0 top-2 h-8 bg-gradient-to-b from-black/20 to-transparent rounded-b-xl mx-4 blur-lg"></div>
        {/* Secondary shadow for depth */}
        <div className="absolute inset-x-0 top-1 h-4 bg-gradient-to-b from-black/10 to-transparent rounded-b-lg mx-2 blur-sm"></div>
      </div>
    </div>
  );
}