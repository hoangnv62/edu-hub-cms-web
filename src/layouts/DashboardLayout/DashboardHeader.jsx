import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Avatar, Box,
  Menu, MenuItem, ListItemIcon, Divider,
} from '@mui/material';
import { PersonOutlined, LogoutOutlined } from '@mui/icons-material';
import useAuth from '@/hooks/useAuth';
import { PATHS } from '@/routes/paths';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const avatarLetter = user?.fullName?.charAt(0)?.toUpperCase() ?? '?';

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigate(PATHS.PROFILE);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.paper', color: 'text.primary' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          EduHub
        </Typography>

        <Box
          onClick={handleOpen}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            cursor: 'pointer', borderRadius: 2, px: 1.5, py: 0.5,
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Avatar src={user?.avatar} sx={{ width: 34, height: 34, fontSize: 14 }}>
            {avatarLetter}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {user?.fullName}
          </Typography>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 0.5 }}
        >
          <MenuItem onClick={handleProfile}>
            <ListItemIcon><PersonOutlined fontSize="small" /></ListItemIcon>
            Thông tin cá nhân
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
