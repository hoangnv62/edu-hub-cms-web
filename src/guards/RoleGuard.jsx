import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { PATHS } from '@/routes/paths';

const RoleGuard = ({ allowedRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={PATHS.LOGIN} replace />;
  if (user.role !== allowedRole) return <Navigate to={PATHS.FORBIDDEN} replace />;
  return <Outlet />;
};

export default RoleGuard;
