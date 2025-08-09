export function MacWindowHeader({ title = "Algorithm Visualizer" }: { title?: string }) {
  return (
    <div className="relative flex items-center justify-between px-5 py-3 bg-gradient-to-b from-gray-50 to-gray-200 border-b border-gray-300/50">
      {/* Subtle inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
      
      {/* Traffic Light Buttons */}
      <div className="relative flex items-center gap-2">
        {/* Close Button */}
        <div className="group cursor-pointer">
          <div className="w-3 h-3 rounded-full bg-gradient-to-b from-red-400 to-red-600 border border-red-700/20 shadow-sm group-hover:from-red-300 group-hover:to-red-500 transition-all duration-150">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
          </div>
        </div>
        
        {/* Minimize Button */}
        <div className="group cursor-pointer">
          <div className="w-3 h-3 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 border border-yellow-700/20 shadow-sm group-hover:from-yellow-300 group-hover:to-yellow-500 transition-all duration-150">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
          </div>
        </div>
        
        {/* Maximize Button */}
        <div className="group cursor-pointer">
          <div className="w-3 h-3 rounded-full bg-gradient-to-b from-green-400 to-green-600 border border-green-700/20 shadow-sm group-hover:from-green-300 group-hover:to-green-500 transition-all duration-150">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Window Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-700 font-medium tracking-wide">
        {title}
      </div>

      {/* Right spacer for symmetry */}
      <div className="w-16"></div>
    </div>
  );
}