import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { Authority } from '@/constants/authority';
import { PATHS } from '@/routes/paths';

const GuestGuard = () => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) {
    const dest = user?.role === Authority.TEACHER ? PATHS.TEACHER.ROOT : PATHS.STUDENT.ROOT;
    return <Navigate to={dest} replace />;
  }
  return <Outlet />;
};

export default GuestGuard;
