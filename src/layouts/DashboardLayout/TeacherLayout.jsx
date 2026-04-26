import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import {
  DashboardOutlined, ClassOutlined, AssignmentOutlined, MenuBookOutlined,
} from '@mui/icons-material';
import DashboardHeader from './DashboardHeader';
import { PATHS } from '@/routes/paths';

const DRAWER_WIDTH = 240;

const menuItems = [
  { label: 'Tổng quan', icon: DashboardOutlined, path: PATHS.TEACHER.ROOT },
  { label: 'Danh sách lớp học', icon: ClassOutlined, path: PATHS.TEACHER.CLASSES },
  { label: 'Bài tập', icon: AssignmentOutlined, path: PATHS.TEACHER.EXERCISES },
  { label: 'Bài giảng', icon: MenuBookOutlined, path: PATHS.TEACHER.LECTURES },
];

const TeacherLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardHeader />

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List disablePadding sx={{ px: 1, pt: 1 }}>
          {menuItems.map(({ label, icon: Icon, path }) => {
            const active = pathname === path;
            return (
              <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={active}
                  onClick={() => navigate(path)}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon sx={{ minWidth: 38 }}>
                    <Icon fontSize="small" color={active ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={active ? 600 : 400}>
                        {label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default TeacherLayout;
