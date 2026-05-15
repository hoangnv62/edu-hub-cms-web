# Trang Chi Tiết Lớp Học

## Tổng Quan

Trang này dùng để hiển thị thông tin chi tiết của một lớp học dành cho giáo viên.

Giảng viên có thể:

- xem thông tin lớp học
- xem danh sách học sinh
- xem danh sách bài tập

---

# Route

/teacher/classes/:id

Ví dụ:

/teacher/classes/1

---

# Bố Cục Trang

Trang gồm các phần:

1. Header lớp học
2. Tabs
3. Tab tổng quan
4. Tab học sinh
5. Tab bài tập

---

# Header Lớp Học

Hiển thị:

- tên lớp học
- mô tả lớp học
- tên giảng viên
- ngày tạo

---

# Tabs

Sử dụng Ant Design Tabs.

Danh sách tab:

- Tổng quan
- Học sinh
- Bài tập

---

# Tab Tổng Quan

Hiển thị:

1. Tổng số học sinh
2. Tổng số bài tập
3. Danh sách bài tập trong tuần
4. Điểm trung bình của cả lớp

---

# Tab Học Sinh

## Chức Năng

- tìm kiếm học sinh
- phân trang
- xem chi tiết học sinh
- import danh sách học sinh vào lớp học

## Cột Trong Bảng

- họ tên
- email
- ngày tham gia
- điểm trung bình
- hành động

## Hành Động

- xem chi tiết -> chuyển sang trang chi tiết học sinh
- xoá học sinh khỏi lớp
- thêm học sinh vào lớp bằng cách mở popup sau đó tìm kiếm theo keyword và nhấn thêm vào lớp

---

# Tab Bài Tập

## Chức Năng

- tìm kiếm bài tập
- lọc theo trạng thái
- phân trang
- tạo bài tập

## Cột Trong Bảng

- tên bài tập
- mô tả
- hạn nộp
- trạng thái
- tỉ lệ nộp bài
- hành động

## Hành Động

- chỉnh sửa bài tập
- xoá bài tập
- xem danh sách bài nộp

---

# APIs

## API Lấy Thông Tin Lớp Học

GET /api/classes/{id}

Response:

```json
{
  "id": 1,
  "name": "Java Backend",
  "description": "Lớp Spring Boot",
  "teacherName": "Nguyen Van A",
  "studentCount": 30,
  "assignmentCount": 10,
  "completionRate": 0.7,
  "avgScore":8.5,
  "createdDate": "2026-05-15T10:00:00Z"
}

## API Lấy danh sách học sinh
GET /api/classes/students
Param: keyword

Response:
{
	"content": [
		{
			"id": 1,
			"name": "Bài 1",
			"joinDate":"13894329743",
            "avgScore":7.8
		}
	],
	"empty": false,
	"first": true,
	"last": true,
	"number": 0,
	"numberOfElements": 1,
	"pageable": {
		"offset": 0,
		"pageNumber": 0,
		"pageSize": 20,
		"paged": true,
		"sort": [],
		"unpaged": false
	},
	"size": 20,
	"sort": [],
	"totalElements": 1,
	"totalPages": 1
}
```
