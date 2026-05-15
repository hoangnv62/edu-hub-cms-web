import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useClassDetail } from '@/hooks/queries/class/useClassDetail';
import ClassDetailHeader from './detail/ui/class-detail-header';
import OverviewTab from './detail/overview-tab';
import StudentsTab from './detail/students-tab';

const TABS = [
  { label: 'Tổng quan' },
  { label: 'Học sinh' },
];

const ClassDetailDashboard = () => {
  const { classId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const { classDetail, loading } = useClassDetail(classId);

  return (
    <Box>
      <ClassDetailHeader classDetail={classDetail} loading={loading} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
          {TABS.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {tabIndex === 0 && <OverviewTab classDetail={classDetail} />}
      {tabIndex === 1 && <StudentsTab classId={classId} />}
    </Box>
  );
};

export default ClassDetailDashboard;
