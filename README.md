# CodeSphere 

> A lightweight, in-browser code playground and real-time execution sandbox built with React, Vite, Tailwind CSS, and Microsoft's Monaco Editor.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Active-0284c7?style=for-the-badge&logo=github)](https://2024uch1376-spec.github.io/codesphere/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🚀 Live Demo

Access the running deployment here:  
 **[https://2024uch1376-spec.github.io/codesphere/](https://2024uch1376-spec.github.io/codesphere/)**

---

##  Features

- **Monaco Editor Core**: Features syntax highlighting, real-time code tokenization, autocompletion, bracket matching, and auto-indentation powered by the same engine behind VS Code.
- **Sandboxed Execution Runtime**: Executes untrusted user JavaScript, HTML, and CSS inside an isolated `iframe` with explicit sandbox flags (`allow-scripts`, `allow-same-origin`, `allow-modals`) to prevent UI lockup and DOM pollution.
- **Debounced Live Compilation**: Re-executes and re-renders scripts automatically on input change with a debounced 400ms buffer, ensuring sub-40ms parse latency with zero typing lag.
- **Bi-Directional Telemetry Bridge (IPC)**: Custom event hook overriding child frame `console.log`, `console.error`, and `window.onerror` to stream structured logs and runtime exceptions back to the parent terminal drawer.
- **State Persistence**: Preserves working code models across page reloads using browser `localStorage`.
- **Responsive Split Workspace**: Clean, customizable two-pane development layout built with Tailwind CSS.

---

## 🛠️ Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────┐
│                      Parent Window                     │
│                                                        │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │     Monaco Editor     │   │    Console Drawer    │  │
│  │   (State / Debounce)  │   │   (Log Interceptor)  │  │
│  └───────────┬───────────┘   └──────────▲───────────┘  │
└──────────────┼──────────────────────────┼──────────────┘
               │                          │
        srcDoc injection           window.postMessage
        (HTML/CSS/JS)            (IPC Telemetry Bridge)
               │                          │
┌──────────────▼──────────────────────────┴──────────────┐
│                    Sandboxed Iframe                    │
│                                                        │
│    window.onerror / console.log / console.error Hook    │
│    Runtime Execution & Live Visual Render              │
└────────────────────────────────────────────────────────┘
```
##📁 Project Structure
```
codesphere/
├── public/
├── src/
│   ├── components/
│   │   ├── ConsoleDrawer.jsx     # Terminal drawer rendering intercepted logs
│   │   ├── EditorPanel.jsx       # Monaco Editor wrapper with layout presets
│   │   ├── Navbar.jsx            # Action controls (Run, Reset, Status indicators)
│   │   └── PreviewPanel.jsx      # Isolated sandboxed iframe container
│   ├── constants/
│   │   └── starterCode.js        # Default scripts and storage keys
│   ├── utils/
│   │   └── sandboxTemplate.js    # Iframe HTML template and IPC script injection
│   ├── App.jsx                   # Central state orchestrator and event listener
│   ├── index.css                 # Global styling and Tailwind directives
│   └── main.jsx                  # Application entry point
├── package.json
├── vite.config.js
└── README.md

```
### 🛠️ Tech Stack
Framework: React 18

Build Tool: Vite

Styling: Tailwind CSS

Code Editor: @monaco-editor/react (Monaco Editor Engine)

Icons: lucide-react

Deployment: gh-pages

### 🚀 Getting Started Locally
Prerequisites
Make sure you have Node.js (v18+) and npm installed on your system.

1. Clone the repository
Bash
git clone [https://github.com/2024uch1376-spec/codesphere.git](https://github.com/2024uch1376-spec/codesphere.git)
cd codesphere
2. Install dependencies
Bash
npm install
3. Run development server
Bash
npm run dev
Open your browser and navigate to http://localhost:5173/codesphere/ to see the live playground.

4. Build for production
Bash
npm run build
🚢 Deployment
CodeSphere is configured for single-command deployments to GitHub Pages using the gh-pages utility:

Bash
npm run deploy
This runs the predeploy Vite production build and pushes the compiled bundle (dist/) directly to the gh-pages branch.

### 📄 License
This project is licensed under the MIT License.


### How to apply this to your repo:
1. Create a new file named `README.md` in the root of your `codesphere` folder (or open your existing one).
2. Paste the markdown content above and save.
3. Push to GitHub:
   ```powershell
   git add README.md
   git commit -m "docs: add comprehensive production README"
   git push origin main
