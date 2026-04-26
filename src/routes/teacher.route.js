import {createElement} from 'react';
import RoleGuard from '@/guards/RoleGuard';
import TeacherDashboard from '@/pages/dashboard/teacher';
import {Authority} from '@/constants/authority';
import {PATHS} from './paths';
import TeacherLayout from "@/layouts/DashboardLayout/TeacherLayout.jsx";
import ClassDashboard from "@/pages/dashboard/teacher/class/class-dashboard.jsx";
import ClassDetailDashboard from "@/pages/dashboard/teacher/class/class-detail-dashboard.jsx";

export const teacherRoutes = {
    element: createElement(RoleGuard, {allowedRole: Authority.TEACHER}),
    children: [
        {
            element: createElement(TeacherLayout),
            children: [
                {
                    path: PATHS.TEACHER.ROOT,
                    element: createElement(TeacherDashboard)
                },
                {
                    path: PATHS.TEACHER.CLASSES,
                    element: createElement(ClassDashboard)
                },
                {
                    path: PATHS.TEACHER.CLASS_DETAIL,
                    element: createElement(ClassDetailDashboard)
                }
            ],
        },
    ],
};
