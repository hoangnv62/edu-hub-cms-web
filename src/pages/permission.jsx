import { Box, Button, Typography } from '@mui/material';
import { LuLock } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const PermissionPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <LuLock size={80} color="#d32f2f" />
      <Typography variant="h1" fontWeight="bold" color="error" sx={{ fontSize: '5rem' }}>403</Typography>
      <Typography variant="h5">Không có quyền truy cập</Typography>
      <Typography color="text.secondary">Bạn không có quyền xem trang này.</Typography>
      <Button variant="contained" onClick={() => navigate(-1)}>Quay lại</Button>
    </Box>
  );
};

export default PermissionPage;
