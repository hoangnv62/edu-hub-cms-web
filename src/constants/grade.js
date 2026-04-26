export const GRADE_OPTIONS = [
  { value: 'GRADE_1', label: 'Lớp 1' },
  { value: 'GRADE_2', label: 'Lớp 2' },
  { value: 'GRADE_3', label: 'Lớp 3' },
  { value: 'GRADE_4', label: 'Lớp 4' },
  { value: 'GRADE_5', label: 'Lớp 5' },
  { value: 'GRADE_6', label: 'Lớp 6' },
  { value: 'GRADE_7', label: 'Lớp 7' },
  { value: 'GRADE_8', label: 'Lớp 8' },
  { value: 'GRADE_9', label: 'Lớp 9' },
  { value: 'GRADE_10', label: 'Lớp 10' },
  { value: 'GRADE_11', label: 'Lớp 11' },
  { value: 'GRADE_12', label: 'Lớp 12' },
];

export const GRADE_LABEL = Object.fromEntries(GRADE_OPTIONS.map((g) => [g.value, g.label]));
