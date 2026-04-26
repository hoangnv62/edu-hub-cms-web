import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Typography variant="h1" fontWeight="bold" color="primary" sx={{ fontSize: '8rem' }}>404</Typography>
      <Typography variant="h5">Trang không tồn tại</Typography>
      <Typography color="text.secondary">Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.</Typography>
      <Button variant="contained" onClick={() => navigate(-1)}>Quay lại</Button>
    </Box>
  );
};

export default NotFoundPage;
