export const PATHS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  TEACHER: {
    ROOT: '/teacher',
    CLASSES: '/teacher/classes',
    CLASS_DETAIL: '/teacher/classes/:classId',
    EXERCISES: '/teacher/exercises',
    STUDENTS: '/teacher/students',
    LECTURES: '/teacher/lectures',
  },
  STUDENT: {
    ROOT: '/student',
    CLASSES: '/student/classes',
    EXERCISES: '/student/exercises',
    GRADES: '/student/grades',
    LECTURES: '/student/lectures',
  },
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
};
