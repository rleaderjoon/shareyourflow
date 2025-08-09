import { TerminalHeader } from './TerminalHeader';
import { TerminalPrompt } from './TerminalPrompt';
import { CodeViewer } from './CodeViewer';

export function TerminalWindow() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      <TerminalHeader title="Algorithm Viewer" />
      
      <div className="flex flex-col h-[80vh]">
        {/* Terminal prompt section */}
        <div className="px-4 py-3 bg-gray-900 border-b border-gray-700">
          <TerminalPrompt command="ls -la" />
          <div className="mt-2 text-sm font-mono text-gray-300">
            <div>total 3</div>
            <div className="text-blue-400">drwxr-xr-x  2 user  staff   64 Aug  2 14:30 .</div>
            <div className="text-blue-400">drwxr-xr-x  3 user  staff   96 Aug  2 14:29 ..</div>
            <div className="text-green-400">-rw-r--r--  1 user  staff  512 Aug  2 14:30 problem.js</div>
            <div className="text-green-400">-rw-r--r--  1 user  staff  389 Aug  2 14:30 solution.js</div>
            <div className="text-cyan-400">-rw-r--r--  1 user  staff  1.2K Aug  2 14:30 README.md</div>
          </div>
          <div className="mt-3">
            <TerminalPrompt />
          </div>
        </div>

        {/* Code viewer section */}
        <CodeViewer />
      </div>
    </div>
  );
}