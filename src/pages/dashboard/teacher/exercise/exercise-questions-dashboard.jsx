import { Box, Button, Typography } from '@mui/material';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

const ExerciseQuestionsDashboard = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        startIcon={<LuArrowLeft size={18} />}
        onClick={() => navigate(PATHS.TEACHER.EXERCISES)}
        sx={{ mb: 2 }}
      >
        Quay lại danh sách bài tập
      </Button>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Danh sách câu hỏi
      </Typography>
      <Typography color="text.secondary">
        Bài tập #{exerciseId} — tính năng đang phát triển.
      </Typography>
    </Box>
  );
};

export default ExerciseQuestionsDashboard;
