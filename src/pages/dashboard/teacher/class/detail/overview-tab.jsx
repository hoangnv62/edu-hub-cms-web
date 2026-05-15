import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { LuClipboardList, LuStar, LuTrendingUp, LuUsers } from 'react-icons/lu';

const StatCard = ({ icon, label, value, color }) => (
  <Paper variant="outlined" sx={{ p: 3 }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ color }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="h5" fontWeight="bold">{value}</Typography>
      </Box>
    </Stack>
  </Paper>
);

const OverviewTab = ({ classDetail }) => {
  const completionPct = classDetail?.completionRate != null
    ? `${Math.round(classDetail.completionRate * 100)}%`
    : '—';

  return (
    <Box sx={{ pt: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<LuUsers size={32} />}
            label="Tổng số học sinh"
            value={classDetail?.studentCount ?? 0}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<LuClipboardList size={32} />}
            label="Tổng số bài tập"
            value={classDetail?.assignmentCount ?? 0}
            color="warning.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<LuStar size={32} />}
            label="Điểm trung bình"
            value={classDetail?.avgScore != null ? classDetail.avgScore.toFixed(1) : '—'}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={<LuTrendingUp size={32} />}
            label="Tỉ lệ hoàn thành"
            value={completionPct}
            color="info.main"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewTab;
