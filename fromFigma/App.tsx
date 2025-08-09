import { MacWindow } from './components/MacWindow';
import { TerminalInterface } from './components/TerminalInterface';

export default function App() {
  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <MacWindow title="Algorithm Visualizer">
        <TerminalInterface />
      </MacWindow>
    </div>
  );
}