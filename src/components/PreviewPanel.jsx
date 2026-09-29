import React from 'react';
import ConsoleDrawer from './ConsoleDrawer';

export default function PreviewPanel({ srcDoc, logs }) {
  return (
    <div className="w-1/2 h-full flex flex-col bg-white">
      <div className="flex-1 relative">
        <iframe
          srcDoc={srcDoc}
          title="Sandbox Preview Output"
          sandbox="allow-scripts allow-same-origin allow-modals"
          className="w-full h-full border-none"
        />
      </div>
      <ConsoleDrawer logs={logs} />
    </div>
  );
}