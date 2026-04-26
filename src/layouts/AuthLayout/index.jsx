import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'grey.100',
    }}
  >
    <Outlet />
  </Box>
);

export default AuthLayout;
