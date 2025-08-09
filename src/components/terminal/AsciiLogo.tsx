"use client";

export function AsciiLogo() {
  const logo = `
   _____ _                     __     __                 ______ _               
  / ____| |                    \\ \\   / /                |  ____| |              
 | (___ | |__   __ _ _ __ ___    \\ \\_/ /__  _   _ _ __   | |__  | | _____      __
  \\___ \\| '_ \\ / _\` | '__/ _ \\    \\   / _ \\| | | | '__|  |  __| | |/ _ \\ \\ /\\ / /
  ____) | | | | (_| | | |  __/     | | (_) | |_| | |     | |    | | (_) \\ V  V / 
 |_____/|_| |_|\\__,_|_|  \\___|     |_|\\___/ \\__,_|_|     |_|    |_|\\___/ \\_/\\_/  
                                                                                 
  `;

  return (
    <div className="text-center mb-8">
      <pre className="text-neutral-900 text-xs leading-none font-mono whitespace-pre">
        {logo}
      </pre>
      <div className="mt-4 text-neutral-700 text-sm font-mono">Interactive Algorithm Visualizer</div>
    </div>
  );
}

export default AsciiLogo;


