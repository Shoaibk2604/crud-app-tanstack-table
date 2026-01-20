# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## CRUD Demo (Axios + TanStack Query + TanStack Table)

This project implements CRUD operations for `posts` using a mock API powered by JSON Server.

### Run

1. Install dependencies

   npm install

2. Start mock API + Vite dev server (recommended)

   npm run dev:all

This starts:

- JSON Server at http://localhost:3001
- Vite at http://localhost:5173

### Mock API

The JSON Server database is `db.json` at the project root.

Available endpoints:

- GET http://localhost:3001/posts
- POST http://localhost:3001/posts
- PATCH http://localhost:3001/posts/:id
- DELETE http://localhost:3001/posts/:id
# crud-app-tanstack-table
