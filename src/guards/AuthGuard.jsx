import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { PATHS } from '@/routes/paths';

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={PATHS.LOGIN} replace />;
  return <Outlet />;
};

export default AuthGuard;
