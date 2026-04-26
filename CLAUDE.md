# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # ESLint (flat config v9)
npm run preview   # Preview production build
```

Set `VITE_API_URL` in `.env` before running — the axios instance reads it as the base URL.

## Architecture

**Stack**: React 19, React Router v7, MUI v9, TanStack Query v5, Axios, react-hot-toast  
**Language**: JavaScript (no TypeScript)  
**UI language**: Vietnamese throughout (error messages, labels, navigation)

### Path alias

`@` maps to `./src` in both `vite.config.js` and `jsconfig.json`.

### Route construction

All routes are built with `createElement()`, not JSX. The master config is `src/routes/index.route.js`. Domain routes (auth, teacher, student) export arrays of route objects that are merged there.

### Guard layers (applied outside-in)

1. **UnauthorizedHandler** — wraps the entire router; listens for the custom `'unauthorized'` window event and redirects to `/login`
2. **GuestGuard** — redirects already-authenticated users away from `/login` and `/register` based on their role
3. **AuthGuard** — blocks unauthenticated access to protected routes
4. **RoleGuard** — enforces `ROLE_TEACHER` / `ROLE_STUDENT` access; redirects to `/403` on mismatch

Role constants are in `src/constants/Authority.js` (`Object.freeze()`).

### Auth pattern

`src/contexts/jwt.context.js` — `useReducer` with actions `INIT | LOGIN | LOGOUT | REGISTER`.  
Token is stored in `localStorage`. On mount, the provider reads the token, validates it with the backend, then dispatches `INIT`. The app renders a `LoadingProgress` blocker until `isInitialized` is true.

Axios interceptors in `src/utils/axios.js`:
- **401** → clear token + dispatch `'unauthorized'` custom event (triggers UnauthorizedHandler)
- **403** → toast "Bạn không có quyền truy cập tài nguyên này"
- **500** → toast "Đã xảy ra lỗi máy chủ"
- Timeout: 120 s; `ECONNABORTED` is swallowed silently

### Data fetching

TanStack Query hooks live in `src/hooks/queries/[domain]/`. Service calls (plain axios wrappers) are in `src/services/`.

### Layouts

- **AuthLayout** — minimal centered layout for login/register
- **DashboardLayout** — AppBar + responsive sidebar; sidebar items differ by role
