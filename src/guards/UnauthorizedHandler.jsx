import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

const UnauthorizedHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => navigate(PATHS.LOGIN, { replace: true });
    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [navigate]);

  return <Outlet />;
};

export default UnauthorizedHandler;
