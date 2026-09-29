import React from 'react';
import Editor from '@monaco-editor/react';

export default function EditorPanel({ code, onChange }) {
  return (
    <div className="w-1/2 h-full border-r border-slate-800 flex flex-col">
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          tabSize: 2,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}