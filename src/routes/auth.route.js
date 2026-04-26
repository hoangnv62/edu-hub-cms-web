import { createElement } from 'react';
import GuestGuard from '@/guards/GuestGuard';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/sessions/login';
import RegisterPage from '@/pages/sessions/register';
import { PATHS } from './paths';

export const authRoutes = {
  element: createElement(GuestGuard),
  children: [
    {
      element: createElement(AuthLayout),
      children: [
        { path: PATHS.LOGIN, element: createElement(LoginPage) },
        { path: PATHS.REGISTER, element: createElement(RegisterPage) },
      ],
    },
  ],
};
