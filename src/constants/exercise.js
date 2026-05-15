export const EXERCISE_TYPE_OPTIONS = [
  { value: 'HOMEWORK', label: 'Bài tập về nhà' },
  { value: 'EXAM', label: 'Kiểm tra' },
  { value: 'TEST', label: 'Bài thi' },
];

export const EXERCISE_TYPE_LABEL = {
  HOMEWORK: 'Bài tập về nhà',
  EXAM: 'Kiểm tra',
  TEST: 'Bài thi',
};

export const EXERCISE_TYPE_COLOR = {
  HOMEWORK: 'primary',
  EXAM: 'error',
  TEST: 'warning',
};

export const EXERCISE_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  FINISH: 'FINISH',
});

export const EXERCISE_STATUS_LABEL = {
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Không hoạt động',
  FINISH: 'Đã hoàn thành',
};

export const EXERCISE_STATUS_COLOR = {
  ACTIVE: 'success',
  INACTIVE: 'default',
  FINISH: 'info',
};
