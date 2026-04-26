import { createElement } from 'react';
import RoleGuard from '@/guards/RoleGuard';
import TeacherDashboard from '@/pages/dashboard/teacher';
import { Authority } from '@/constants/authority';
import { PATHS } from './paths';
import TeacherLayout from "@/layouts/DashboardLayout/TeacherLayout.jsx";

export const teacherRoutes = {
  element: createElement(RoleGuard, { allowedRole: Authority.TEACHER }),
  children: [
    {
      element: createElement(TeacherLayout),
      children: [{ path: PATHS.TEACHER.ROOT, element: createElement(TeacherDashboard) }],
    },
  ],
};
