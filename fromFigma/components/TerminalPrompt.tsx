export function TerminalPrompt({ 
  user = "user", 
  directory = "algorithm-viewer",
  command 
}: { 
  user?: string;
  directory?: string;
  command?: string;
}) {
  return (
    <div className="flex items-center gap-1 text-sm font-mono">
      <span className="text-green-400">{user}@macbook</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~/{directory}</span>
      <span className="text-white">$</span>
      {command && <span className="text-white ml-1">{command}</span>}
    </div>
  );
}