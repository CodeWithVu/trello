<h1 align="center">Trello Clone Web (React & Vite)</h1>

<p align="center">
  A highly interactive and modern task management interface inspired by Trello. Features smooth drag-and-drop operations, real-time updates, and a responsive UI.
</p>

## 🌟 Key Features

- **Advanced Drag & Drop:** Seamlessly move cards across columns using `@dnd-kit` with finely tuned sensors and collision detection.
- **Real-time Collaboration:** Live interface updates using Socket.io-client to sync boards instantly across multiple users.
- **Global State Management:** Managed via Redux Toolkit and persisted via `redux-persist` for lightning-fast reloading.
- **Modern UI & Dark Mode:** Built with Tailwind CSS v4 and Headless UI for accessible, mobile-first design.
- **Rich Text Editing:** Markdown support inside cards for detailed task descriptions using `@uiw/react-md-editor`.
- **Form Handling:** Robust and performant form validations using `react-hook-form`.

## 🛠️ Built With

* **Core:** React 19 + Vite
* **Styling:** Tailwind CSS + Headless UI + React Icons
* **State:** Redux Toolkit + React Redux
* **Drag and Drop:** `dnd-kit/core` & `sortable`
* **Network & Real-time:** Axios, Socket.io-client
* **Utilities:** Lodash, Moment.js, React Toastify

## 📂 Project Architecture

```text
src/
├── apis/            # Axios interceptors and direct API calls
├── components/      # Reusable UI details (Modal, Loading, AppBar, etc.)
├── customHook/      # Custom React Hooks (e.g., useDebounce)
├── customLib/       # DND-kit sensor implementations
├── pages/           # Route-level components (Auth, Boards, Settings)
├── redux/           # RTK Slices (activeBoard, user, notifications)
├── socketClient.js  # Socket.IO connection handling
└── utils/           # Formatters, sorting algorithms, validators
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Backend API running locally (refer to `trello-api`)

### Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd trello-web
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Establish your environment variables (create `.env`):
   ```env
   VITE_API_ROOT=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 Technical Highlights for Employers
- **Optimistic UI Updates:** Implemented optimistic rendering to update the Redux store instantly when a card moves, reverting only if the API call fails.
- **Modular Custom Hooks:** Separated concerns by extracting complex drag logic, board initialization, and socket connection events into hook-driven layouts.
- **Responsive Layout:** Features a scrollable canvas that works smoothly on both desktop and touch interfaces.
