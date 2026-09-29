import React from 'react';
import { Code2, Play, RotateCcw } from 'lucide-react';

export default function Navbar({ onReset, onRun }) {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950">
      <div className="flex items-center gap-2">
        <Code2 className="text-sky-400 w-6 h-6" />
        <span className="font-semibold text-lg tracking-wide text-slate-100">CodeSphere</span>
        <span className="text-xs bg-slate-800 text-sky-400 px-2 py-0.5 rounded border border-slate-700">Sandbox</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition rounded hover:bg-slate-800 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-sky-500 hover:bg-sky-400 transition text-slate-950 rounded shadow cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> Run
        </button>
      </div>
    </header>
  );
}