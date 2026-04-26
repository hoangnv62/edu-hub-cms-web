import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ClassDetailDashboard = () => {
  const { classId } = useParams();

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">Chi tiết lớp học</Typography>
      <Typography color="text.secondary">ID: {classId}</Typography>
    </Box>
  );
};

export default ClassDetailDashboard;
