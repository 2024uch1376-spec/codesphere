/**
 * Injects user code into an isolated HTML document with console/error IPC hooks.
 */
export const buildSandboxedHtml = (sourceCode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            padding: 1.5rem; 
            background: #ffffff; 
            color: #1e293b; 
          }
        </style>
      </head>
      <body>
        <script>
          const dispatchMessage = (type, args) => {
            try {
              const payload = args.map(arg => {
                if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
                return String(arg);
              }).join(' ');
              window.parent.postMessage({ type, payload }, '*');
            } catch (err) {
              window.parent.postMessage({ type: 'CONSOLE_ERROR', payload: 'Serialization failure' }, '*');
            }
          };

          const origLog = console.log;
          console.log = (...args) => {
            origLog.apply(console, args);
            dispatchMessage('CONSOLE_LOG', args);
          };

          const origError = console.error;
          console.error = (...args) => {
            origError.apply(console, args);
            dispatchMessage('CONSOLE_ERROR', args);
          };

          window.onerror = (message) => {
            dispatchMessage('CONSOLE_ERROR', [message]);
            return true;
          };

          setTimeout(() => {
            try {
              ${sourceCode}
            } catch (error) {
              dispatchMessage('CONSOLE_ERROR', [error.message]);
            }
          }, 50);
        </script>
      </body>
    </html>
  `;
};