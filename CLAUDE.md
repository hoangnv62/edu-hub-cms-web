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

**Stack**: React 19, React Router v7, MUI v9, Axios, react-hot-toast, react-icons, dayjs, @mui/x-date-pickers  
**Language**: JavaScript (no TypeScript)  
**UI language**: Vietnamese throughout (error messages, labels, navigation)

> See `.claude/PROJECT_STRUCTURE.md` for the full file tree and route/API map.  
> See `.claude/RULES.md` for all coding conventions.

### Path alias

`@` maps to `./src` in both `vite.config.js` and `jsconfig.json`.

### Route construction

All routes are built with `createElement()`, not JSX. The master config is `src/routes/index.route.js`. Domain routes (auth, teacher, student) export route objects that are merged there.

Parameterized paths (e.g. `PATHS.TEACHER.CLASS_DETAIL = '/teacher/classes/:classId'`) use `generatePath` from `react-router-dom` when navigating, and `useParams()` in the target page.

### Guard layers (applied outside-in)

1. **UnauthorizedHandler** — wraps the entire router; listens for the custom `'unauthorized'` window event and redirects to `/login`
2. **GuestGuard** — redirects already-authenticated users away from `/login` and `/register` based on their role
3. **AuthGuard** — blocks unauthenticated access to protected routes
4. **RoleGuard** — enforces `ROLE_TEACHER` / `ROLE_STUDENT` access; redirects to `/403` on mismatch

Role constants are in `src/constants/authority.js` (`Object.freeze()`).

### Auth pattern

`src/contexts/jwt.context.js` — `useReducer` with actions `INIT | LOGIN | LOGOUT | REGISTER`.  
Token is stored in `localStorage`. On mount, the provider reads the token, validates it with the backend, then dispatches `INIT`. The app renders a `LoadingProgress` blocker until `isInitialized` is true.

### Axios & error handling

Interceptors in `src/utils/axios.js`:
- **401** → clear token + dispatch `'unauthorized'` event (only when a token was present; login failures handled by callers)
- **403** → toast error
- **500** → toast error
- Other errors — **not toasted by the interceptor**; callers handle them

**Do not add a `default` toast in the interceptor.** Mutation hooks use `toastPromise` (`src/utils/toast-promise.js`) which already shows an error toast — adding one in the interceptor causes duplicate toasts.

### Data fetching

Hooks in `src/hooks/queries/[domain]/` are **custom hooks** using `useState` + `useEffect` (not TanStack Query). Pattern:

- **List hooks** (e.g. `useClasses(params)`) — accept a params object, stringify it as the effect dependency, and expose `{ data, loading, refetch }`.
- **Mutation hooks** (e.g. `useClassMutations`) — each method accepts an optional `callback` called on success; they use `toastPromise` for loading/success/error feedback.
- **Detail hooks** (e.g. `useClassDetail(id)`) — skip the fetch when `id` is falsy.

Service calls (plain axios wrappers) are in `src/services/`.

### CRUD page structure

Feature pages follow a split-file pattern (see `src/pages/dashboard/teacher/class/`):

```
[feature]-dashboard.jsx      ← state, hooks, dialogs (orchestrator only)
[feature]-list-view.jsx      ← table + AppTablePagination
create-[feature]-form-view.jsx ← MUI Dialog for create/edit
ui/
  [feature]-header.jsx       ← page title
  [feature]-filter.jsx       ← search inputs
  [feature]-table-row.jsx    ← single table row; handles own navigation via useNavigate
```

**Form dialog pattern**: render the form conditionally (`{open && <FormView />}`) so it remounts on each open, giving a clean `useState` initializer. Pass `initialValues` from the already-fetched list row instead of re-fetching — avoids `useEffect`→`setState` anti-pattern.

**Debounced search**: use `useDebounce(value, 1000)` (`src/hooks/useDebounce.js`). Reset pagination to page 0 inside the event handler alongside the state setter, not in a `useEffect`.

### Date & time in forms

Use **`DateTimePicker`** from `@mui/x-date-pickers` — do **not** use `type="date"` or `type="time"` inside MUI Dialogs (native browser pickers are blocked by the Dialog backdrop in some browsers).

- `LocalizationProvider` (AdapterDayjs, locale `"vi"`) is configured once in `src/main.jsx`
- Store date as **dayjs** object in form state: `dayjs(initialValues.someDate)`
- Submit to API: `toApiDateTime(dayjsValue)` → `"yyyy-MM-dd HH:mm"`
- Display on UI: `formatDateTime(longMs)` → `"yyyy/mm/dd hh:mm"`
- Both utilities are in `src/utils/format-date.js`

### Shared components

- `src/components/common/AppTablePagination.jsx` — reusable MUI `TablePagination` wrapper with Vietnamese labels. Props: `count`, `page`, `rowsPerPage`, `onPageChange`, `onRowsPerPageChange`.
- `src/components/loader/TableLoadingSkeleton.jsx` — skeleton rows for table loading states. Props: `rowCount`, `colCount`.

### Icons

Use **`react-icons/lu`** (Lucide) exclusively — do **not** use `@mui/icons-material`. Size icons with the `size` prop; inherit color from a parent MUI `sx={{ color: ... }}`.

Before using a new icon name, verify it exists:
```bash
node -e "const m=require('fs').readFileSync('node_modules/react-icons/lu/index.mjs','utf8'); console.log(m.includes('LuYourIcon') ? 'OK' : 'MISSING')"
```

### Constants

- `src/constants/authority.js` — `Authority.TEACHER` / `Authority.STUDENT`
- `src/constants/grade.js` — `GRADE_OPTIONS` (array for selects) and `GRADE_LABEL` (map for display)
- `src/constants/exercise.js` — `EXERCISE_TYPE_OPTIONS/LABEL/COLOR`, `EXERCISE_STATUS`, `EXERCISE_STATUS_LABEL/COLOR`

When adding a new domain, create `src/constants/[domain].js` with `[ENTITY]_OPTIONS`, `[ENTITY]_LABEL`, `[ENTITY]_COLOR` exports.

### Layouts

- **AuthLayout** — minimal centered layout for login/register
- **TeacherLayout / StudentLayout** — AppBar (`DashboardHeader`) + permanent sidebar; sidebar `color` is controlled via `ListItemIcon sx={{ color: active ? 'primary.main' : 'text.secondary' }}`
