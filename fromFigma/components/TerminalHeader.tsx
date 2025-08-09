export function TerminalHeader({ title = "terminal" }: { title?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-sm text-gray-300 font-medium">{title}</div>
      <div className="w-14"></div> {/* Spacer for symmetry */}
    </div>
  );
}