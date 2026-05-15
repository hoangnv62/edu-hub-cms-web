# Quy Tắc & Convention Của Project

## Ngôn Ngữ & Công Nghệ

- Chỉ sử dụng **JavaScript** — không dùng TypeScript, không dùng file `.ts`/`.tsx`
- Ngôn ngữ giao diện: **Tiếng Việt** toàn bộ — label, thông báo lỗi, toast, placeholder
- Sử dụng:
  - React 19
  - MUI v9
  - React Router v7
  - Axios
  - react-hot-toast
  - react-icons
  - dayjs + @mui/x-date-pickers

---

# Quy Tắc Đặt Tên File

| Loại              | Ví dụ                                                                           |
| ----------------- | ------------------------------------------------------------------------------- |
| Trang feature     | `exercise-dashboard.jsx`                                                        |
| Trang danh sách   | `exercise-list-view.jsx`                                                        |
| Dialog form       | `create-exercise-form-view.jsx`                                                 |
| UI sub-components | `ui/exercise-header.jsx`, `ui/exercise-filter.jsx`, `ui/exercise-table-row.jsx` |
| Hooks             | `useExercises.js`, `useExerciseMutations.js`                                    |
| Services          | `exercise.service.js`                                                           |
| Constants         | `exercise.js`                                                                   |

---

# Quy Tắc Tạo Route

- Tất cả route phải dùng `createElement()` — tuyệt đối không dùng JSX trong file route
- Tập trung toàn bộ path trong `src/routes/paths.js`
- Khi navigate có param phải dùng `generatePath()` từ `react-router-dom`
- Trang đích đọc param bằng `useParams()`

---

# Icons

- Chỉ sử dụng `react-icons/lu` (Lucide)
- Tuyệt đối không dùng `@mui/icons-material`
- Set kích thước bằng prop `size`
- Set màu bằng `sx={{ color: ... }}` ở component cha

Kiểm tra icon có tồn tại trước khi dùng:

```bash
node -e "const m=require('fs').readFileSync('node_modules/react-icons/lu/index.mjs','utf8'); console.log(m.includes('LuYourIcon') ? 'OK' : 'MISSING')"
```

---

# Cấu Trúc Trang CRUD

Mỗi feature phải theo cấu trúc tách file:

```text
[feature]-dashboard.jsx          ← quản lý state + hooks + dialog (orchestrator)
[feature]-list-view.jsx          ← table + AppTablePagination
create-[feature]-form-view.jsx   ← MUI Dialog (create & edit)

ui/
  [feature]-header.jsx           ← tiêu đề trang
  [feature]-filter.jsx           ← search + filter
  [feature]-table-row.jsx        ← từng dòng table; tự xử lý navigation
```

---

# Quy Tắc Form Dialog

- Render conditionally:

```jsx
{
  open && <FormView />;
}
```

để component được remount mỗi lần mở dialog và reset `useState`

- Truyền `initialValues` từ dữ liệu row đã fetch trước đó — không gọi lại API trong dialog
- `editId` dùng để xác định create hay update mode
- Validate trước khi submit
- Hiển thị lỗi bằng props `error` và `helperText` của MUI
- Khi user thay đổi field thì phải clear lỗi của field đó

---

# Date & Time Trong Form

- Sử dụng `DateTimePicker` từ `@mui/x-date-pickers`
- Không dùng native `type="date"` hoặc `type="time"` vì dễ lỗi trong MUI Dialog ở một số browser
- State phải lưu dưới dạng object `dayjs`

Load từ API:

```js
dayjs(initialValues.someDate);
```

Submit lên API:

```js
toApiDateTime(dayjsValue);
```

→ format `"yyyy-MM-dd HH:mm"`

Hiển thị ra UI:

```js
formatDateTime(longMs);
```

→ format `"yyyy/MM/dd HH:mm"`

- Hai utility nằm trong:
  `src/utils/format-date.js`
- `LocalizationProvider` chỉ cấu hình một lần trong `src/main.jsx`
- Không được thêm `LocalizationProvider` ở từng component

---

# Hooks Gọi API

Đặt tại:

```text
src/hooks/queries/[domain]/
```

Sử dụng:

- `useState`
- `useEffect`

Không dùng TanStack Query.

---

## List Hooks

Ví dụ:

```js
useExercises(params);
```

Yêu cầu:

- Nhận object params
- Dùng `JSON.stringify(params)` trong dependency của `useEffect`
- Return:

```js
{
  (data, loading, refetch);
}
```

---

## Mutation Hooks

Ví dụ:

```js
useExerciseMutations();
```

Quy tắc:

- Mỗi method có signature:

```js
(payload, callback?)
```

- Sử dụng `toastPromise`
- Không thêm toast riêng
- Khi thành công:

```js
callback?.(data);
```

---

## Detail Hooks

Ví dụ:

```js
useExerciseDetail(id);
```

- Không gọi API nếu `id` falsy

---

# Search & Pagination

- Debounce mặc định: `1000ms`

```js
useDebounce(value, 1000);
```

- Pagination mặc định:

```js
{
  page: 0,
  size: 20
}
```

- Khi filter thay đổi:
  - reset `page` về `0`
  - thực hiện trong event handler
  - không làm trong `useEffect`

- Luôn sử dụng `AppTablePagination`
- Component này đã xử lý label tiếng Việt

---

# Xử Lý Lỗi

- Axios interceptor xử lý global cho:
  - 401
  - 403
  - 500

- Mutation phải dùng `toastPromise`
- Không hiển thị toast mặc định trong interceptor

- Khi gặp 401 và có token:
  - dispatch window event `'unauthorized'`
  - `UnauthorizedHandler` sẽ redirect về `/login`

---

# Constants

- Mỗi domain tạo file constants riêng trong:

```text
src/constants/
```

Export:

- `[ENTITY]_OPTIONS`
- `[ENTITY]_LABEL`
- `[ENTITY]_COLOR`

Sử dụng:

```js
Object.freeze();
```

cho object dạng enum

---

# Styling

- Sử dụng MUI `sx` prop toàn bộ
- Không dùng:
  - CSS modules
  - CSS thuần
  - class CSS riêng

- Màu phải lấy từ MUI theme:

```js
"primary.main";
"text.secondary";
"grey.50";
```

- Không hardcode màu hex

---

# Comments

- Mặc định không viết comment
- Chỉ viết khi cần giải thích WHY:
  - hidden constraint
  - workaround
  - invariant khó hiểu

- Không comment giải thích WHAT code đang làm
- Tên biến và tên hàm phải đủ rõ nghĩa để tự mô tả
