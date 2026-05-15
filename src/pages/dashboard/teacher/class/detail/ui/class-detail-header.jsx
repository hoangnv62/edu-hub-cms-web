import { Box, Button, Chip, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { GRADE_LABEL } from '@/constants/grade';
import { PATHS } from '@/routes/paths';
import { formatDateTime } from '@/utils/format-date';

const ClassDetailHeader = ({ classDetail, loading }) => {
  const navigate = useNavigate();

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Button
        startIcon={<LuArrowLeft size={16} />}
        onClick={() => navigate(PATHS.TEACHER.CLASSES)}
        sx={{ mb: 2, pl: 0 }}
      >
        Quay lại danh sách lớp
      </Button>

      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={160} />
        </Stack>
      ) : (
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h5" fontWeight="bold">{classDetail?.name}</Typography>
            {classDetail?.grade && (
              <Chip
                label={GRADE_LABEL[classDetail.grade] ?? classDetail.grade}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>
          {classDetail?.description && (
            <Typography color="text.secondary">{classDetail.description}</Typography>
          )}
          <Stack direction="row" spacing={3}>
            {classDetail?.teacherName && (
              <Typography variant="body2" color="text.secondary">
                Giảng viên: <strong>{classDetail.teacherName}</strong>
              </Typography>
            )}
            {classDetail?.createdDate && (
              <Typography variant="body2" color="text.secondary">
                Ngày tạo: <strong>{formatDateTime(classDetail.createdDate)}</strong>
              </Typography>
            )}
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default ClassDetailHeader;
