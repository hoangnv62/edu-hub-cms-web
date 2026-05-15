import { Stack, Typography } from '@mui/material';

const ExerciseHeader = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
    <Typography variant="h5" fontWeight="bold">Quản lý bài tập</Typography>
  </Stack>
);

export default ExerciseHeader;
