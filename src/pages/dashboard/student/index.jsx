import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { PATHS } from '@/routes/paths';

const stats = [
  { label: 'Lớp học', value: '0', icon: <ClassIcon sx={{ fontSize: 40, color: '#1976d2' }} />, bg: '#e3f2fd' },
  { label: 'Bài tập chờ làm', value: '0', icon: <AssignmentIcon sx={{ fontSize: 40, color: '#f57c00' }} />, bg: '#fff3e0' },
  { label: 'Điểm trung bình', value: '--', icon: <GradeIcon sx={{ fontSize: 40, color: '#388e3c' }} />, bg: '#e8f5e9' },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={0.5}>Xin chào, {user?.fullName}!</Typography>
      <Typography color="text.secondary" mb={4}>Chào mừng bạn đến với trang học toán của bạn</Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {stats.map((s) => (
          <Card key={s.label} sx={{ flex: '1 1 180px', bgcolor: s.bg }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {s.icon}
              <Box>
                <Typography variant="h4" fontWeight="bold">{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" fontWeight="bold" mb={2}>Thao tác nhanh</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" startIcon={<ClassIcon />} size="large" onClick={() => navigate(PATHS.STUDENT.CLASSES)}>Xem lớp học của tôi</Button>
        <Button variant="outlined" startIcon={<AssignmentIcon />} size="large" onClick={() => navigate(PATHS.STUDENT.EXERCISES)}>Bài tập của tôi</Button>
        <Button variant="outlined" startIcon={<GradeIcon />} size="large" onClick={() => navigate(PATHS.STUDENT.GRADES)}>Xem điểm số</Button>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
