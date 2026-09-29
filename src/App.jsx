import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import { DEFAULT_STARTER_CODE, STORAGE_KEY } from './constants/starterCode';
import { buildSandboxedHtml } from './utils/sandboxTemplate';

export default function App() {
  const [code, setCode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_STARTER_CODE;
  });
  const [logs, setLogs] = useState([]);
  const [srcDoc, setSrcDoc] = useState('');

  const runCode = useCallback((source) => {
    setLogs([]);
    setSrcDoc(buildSandboxedHtml(source));
  }, []);

  const handleReset = () => {
    setCode(DEFAULT_STARTER_CODE);
    localStorage.setItem(STORAGE_KEY, DEFAULT_STARTER_CODE);
    runCode(DEFAULT_STARTER_CODE);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, code);
    const handler = setTimeout(() => {
      runCode(code);
    }, 400);

    return () => clearTimeout(handler);
  }, [code, runCode]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'CONSOLE_LOG') {
        setLogs((prev) => [...prev, { type: 'log', text: event.data.payload }]);
      } else if (event.data?.type === 'CONSOLE_ERROR') {
        setLogs((prev) => [...prev, { type: 'error', text: event.data.payload }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-100">
      <Navbar onReset={handleReset} onRun={() => runCode(code)} />
      <div className="flex-1 flex overflow-hidden">
        <EditorPanel code={code} onChange={(val) => setCode(val || '')} />
        <PreviewPanel srcDoc={srcDoc} logs={logs} />
      </div>
    </div>
  );
}