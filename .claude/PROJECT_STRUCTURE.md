# Project Structure

## Top-level

```
edu-hub-cms-web/
├── src/                   # Application source
├── public/                # Static assets served as-is
├── .claude/               # Claude Code project docs (this folder)
├── CLAUDE.md              # Claude Code guidance (root)
├── vite.config.js         # Vite config — defines @ alias → ./src
├── jsconfig.json          # IDE path alias mirror for @ → ./src
├── .env                   # VITE_API_URL (not committed)
└── package.json
```

---

## src/ Full Tree

```
src/
├── assets/                         # Static images (hero.png, logos)
│
├── components/
│   ├── common/
│   │   └── AppTablePagination.jsx  # Reusable MUI TablePagination with Vietnamese labels
│   └── loader/
│       ├── LoadingProgress.jsx     # Full-page blocker during auth init
│       ├── TableLoadingSkeleton.jsx# Skeleton rows for table loading states
│       ├── ListLoadingOverlay.jsx
│       ├── LoaderWithLogo.jsx
│       ├── styles.js
│       └── index.js                # Barrel export
│
├── constants/
│   ├── authority.js                # Authority.TEACHER / Authority.STUDENT
│   ├── grade.js                    # GRADE_OPTIONS (array) + GRADE_LABEL (map)
│   └── exercise.js                 # EXERCISE_TYPE_*, EXERCISE_STATUS, EXERCISE_STATUS_*
│
├── contexts/
│   └── jwt.context.js              # Auth context: useReducer (INIT|LOGIN|LOGOUT|REGISTER)
│
├── guards/
│   ├── UnauthorizedHandler.jsx     # Listens for 'unauthorized' event → redirect /login
│   ├── GuestGuard.jsx              # Redirects logged-in users away from /login
│   ├── AuthGuard.jsx               # Blocks unauthenticated from protected routes
│   └── RoleGuard.jsx               # Enforces ROLE_TEACHER / ROLE_STUDENT
│
├── hooks/
│   ├── useAuth.js                  # Consumes jwt.context
│   ├── useDebounce.js              # useDebounce(value, delay=500)
│   ├── useNavigate.js              # React Router navigate wrapper
│   └── queries/
│       ├── auth/
│       │   └── useLogin.js
│       ├── class/
│       │   ├── useClasses.js       # List: { classes, loading, refetch }
│       │   ├── useClassMutations.js# createClass / updateClass / deleteClass
│       │   └── useClassDetail.js   # Single class by id
│       ├── exercise/
│       │   ├── useExercises.js     # List: { exercises, loading, refetch }
│       │   └── useExerciseMutations.js # createExercise / updateExercise / deleteExercise / toggleStatus
│       └── user/
│           ├── useUsers.js
│           ├── useUserMutations.js
│           └── useUserDetail.js
│
├── layouts/
│   ├── AuthLayout/
│   │   └── index.jsx               # Centered flex layout for login/register
│   └── DashboardLayout/
│       ├── DashboardHeader.jsx     # AppBar with user avatar + logout menu
│       ├── TeacherLayout.jsx       # Sidebar (Tổng quan, Lớp học, Bài tập, Bài giảng) + main
│       └── StudentLayout.jsx       # Sidebar (Tổng quan, Lớp học, Bài tập, Bài giảng, Điểm số) + main
│
├── pages/
│   ├── 404.jsx                     # Not found page
│   ├── permission.jsx              # 403 forbidden page
│   ├── sessions/
│   │   ├── login.jsx               # Login form
│   │   └── register.jsx            # Register form
│   └── dashboard/
│       ├── student/
│       │   └── index.jsx           # Student overview / home
│       └── teacher/
│           ├── index.jsx           # Teacher overview / home (stats cards + quick links)
│           ├── class/              # CLASS MANAGEMENT ─────────────────────────────────
│           │   ├── class-dashboard.jsx         # Orchestrator: state, hooks, dialogs
│           │   ├── class-list-view.jsx          # Table + pagination
│           │   ├── create-class-form-view.jsx   # Create/edit dialog (name, grade, desc)
│           │   ├── class-detail-dashboard.jsx   # Single class detail page (placeholder)
│           │   └── ui/
│           │       ├── class-header.jsx         # "Danh sách lớp học" title
│           │       ├── class-filter.jsx         # Keyword search + grade dropdown
│           │       └── class-table-row.jsx      # Row: name, grade chip, studentCount, actions
│           └── exercise/           # EXERCISE MANAGEMENT ───────────────────────────────
│               ├── exercise-dashboard.jsx       # Orchestrator: state, hooks, dialogs
│               ├── exercise-list-view.jsx        # Table + pagination
│               ├── create-exercise-form-view.jsx # Create/edit dialog (DateTimePicker)
│               ├── exercise-questions-dashboard.jsx # Questions page (placeholder)
│               └── ui/
│                   ├── exercise-header.jsx      # "Quản lý bài tập" title
│                   ├── exercise-filter.jsx      # Keyword search + type dropdown
│                   └── exercise-table-row.jsx   # Row: name, desc, type, dates, status+toggle, actions
│
├── routes/
│   ├── paths.js                    # All PATHS constants (single source of truth)
│   ├── index.route.js              # Master router (createElement only, no JSX)
│   ├── auth.route.js               # /login, /register (behind GuestGuard)
│   ├── teacher.route.js            # /teacher/** (behind RoleGuard TEACHER)
│   └── student.route.js            # /student/** (behind RoleGuard STUDENT)
│
├── services/
│   ├── auth.service.js             # POST /authenticate, GET /authenticate/me
│   ├── class.service.js            # CRUD /classes
│   ├── exercise.service.js         # CRUD /tasks + PATCH /tasks/:id/status
│   ├── user.service.js             # POST /users
│   ├── lesson.service.js           # (stub)
│   └── task.service.js             # GET /tasks (legacy stub)
│
├── utils/
│   ├── axios.js                    # Axios instance: baseURL, interceptors (401/403/500)
│   ├── format-date.js              # formatDateTime(ms) + toApiDateTime(dayjs|ms)
│   ├── localStorage.js             # Token & user get/set/remove helpers
│   └── toast-promise.js            # toast.promise wrapper
│
├── App.jsx                         # RouterProvider
├── main.jsx                        # Root: StrictMode > QueryClientProvider > LocalizationProvider > AuthProvider > App
└── index.css                       # Global resets
```

---

## Route Map

| Path | Component | Guard |
|---|---|---|
| `/login` | login.jsx | GuestGuard |
| `/register` | register.jsx | GuestGuard |
| `/teacher` | teacher/index.jsx | AuthGuard + RoleGuard(TEACHER) |
| `/teacher/classes` | class-dashboard.jsx | AuthGuard + RoleGuard(TEACHER) |
| `/teacher/classes/:classId` | class-detail-dashboard.jsx | AuthGuard + RoleGuard(TEACHER) |
| `/teacher/exercises` | exercise-dashboard.jsx | AuthGuard + RoleGuard(TEACHER) |
| `/teacher/exercises/:exerciseId/questions` | exercise-questions-dashboard.jsx | AuthGuard + RoleGuard(TEACHER) |
| `/student` | student/index.jsx | AuthGuard + RoleGuard(STUDENT) |
| `/403` | permission.jsx | — |
| `/404` | 404.jsx | — |

---

## API Endpoints

| Service | Method | Path |
|---|---|---|
| auth | POST | `/authenticate` |
| auth | GET | `/authenticate/me` |
| class | GET | `/classes` |
| class | GET | `/classes/:id` |
| class | POST | `/classes` |
| class | PUT | `/classes/:id` |
| class | DELETE | `/classes/:id` |
| exercise | GET | `/tasks` |
| exercise | GET | `/tasks/:id` |
| exercise | POST | `/tasks` |
| exercise | PUT | `/tasks/:id` |
| exercise | DELETE | `/tasks/:id` |
| exercise | PATCH | `/tasks/:id/status` |
| user | POST | `/users` |

---

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | 19.2.4 | UI framework |
| react-router-dom | 7.14.2 | Routing |
| @mui/material | 9.0.0 | Component library |
| @mui/x-date-pickers | 9.2.0 | DateTimePicker for forms |
| dayjs | 1.11.x | Date manipulation (adapter for x-date-pickers) |
| axios | 1.15.2 | HTTP client |
| react-hot-toast | 2.6.0 | Toast notifications |
| react-icons | 5.6.0 | Icons (Lucide via `react-icons/lu`) |
| @tanstack/react-query | 5.100.5 | Installed but unused — hooks use useState+useEffect |
| vite | 8.0.4 | Build tool |
