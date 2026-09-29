import React from 'react';
import { MonitorPlay } from 'lucide-react';

export default function ConsoleDrawer({ logs }) {
  return (
    <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col font-mono text-xs">
      <div className="px-4 py-2 border-b border-slate-800 text-slate-400 font-semibold flex items-center gap-2">
        <MonitorPlay className="w-4 h-4 text-sky-400" />
        <span>Console Output</span>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-1">
        {logs.length === 0 ? (
          <div className="text-slate-600">No output printed to console.</div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={log.type === 'error' ? 'text-red-400' : 'text-emerald-400'}
            >
              &gt; {log.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}