import { createElement } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import UnauthorizedHandler from '@/guards/UnauthorizedHandler';
import AuthGuard from '@/guards/AuthGuard';
import NotFoundPage from '@/pages/404';
import PermissionPage from '@/pages/permission';
import { authRoutes } from './auth.route';
import { teacherRoutes } from './teacher.route';
import { studentRoutes } from './student.route';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    element: createElement(UnauthorizedHandler),
    children: [
      { path: PATHS.ROOT, element: createElement(Navigate, { to: PATHS.LOGIN, replace: true }) },
      authRoutes,
      {
        element: createElement(AuthGuard),
        children: [teacherRoutes, studentRoutes],
      },
      { path: PATHS.FORBIDDEN, element: createElement(PermissionPage) },
      { path: PATHS.NOT_FOUND, element: createElement(NotFoundPage) },
      { path: '*', element: createElement(Navigate, { to: PATHS.NOT_FOUND, replace: true }) },
    ],
  },
]);
