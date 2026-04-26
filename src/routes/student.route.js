import { createElement } from 'react';
import RoleGuard from '@/guards/RoleGuard';
import StudentDashboard from '@/pages/dashboard/student';
import { Authority } from '@/constants/authority';
import { PATHS } from './paths';
import StudentLayout from "@/layouts/DashboardLayout/StudentLayout.jsx";

export const studentRoutes = {
  element: createElement(RoleGuard, { allowedRole: Authority.STUDENT }),
  children: [
    {
      element: createElement(StudentLayout),
      children: [{ path: PATHS.STUDENT.ROOT, element: createElement(StudentDashboard) }],
    },
  ],
};
