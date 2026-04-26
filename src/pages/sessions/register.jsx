import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert, Box, Button, Card, CardContent, IconButton,
  InputAdornment, Link, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { LuEye, LuEyeOff, LuGraduationCap, LuUser } from 'react-icons/lu';
import useAuth from '@/hooks/useAuth';
import { Authority } from '@/constants/authority';
import { PATHS } from '@/routes/paths';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', username: '', password: '', confirmPassword: '', role: Authority.STUDENT,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await register({
        fullName: form.fullName, username: form.username,
        password: form.password, role: form.role,
      });
      navigate(user.role === Authority.TEACHER ? PATHS.TEACHER.ROOT : PATHS.STUDENT.ROOT, { replace: true });
    } catch {
      setError('Đăng ký thất bại. Tên đăng nhập có thể đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 480, mx: 2, my: 3, boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" mb={0.5}>
          EduHub
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          Tạo tài khoản mới
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="body2" fontWeight={500} mb={1}>Bạn là:</Typography>
          <ToggleButtonGroup
            value={form.role} exclusive fullWidth
            onChange={(_, v) => v && setForm((prev) => ({ ...prev, role: v }))}
            sx={{ mb: 1 }}
          >
            <ToggleButton value={Authority.STUDENT} sx={{ gap: 1 }}>
              <LuUser size={18} /> Học sinh
            </ToggleButton>
            <ToggleButton value={Authority.TEACHER} sx={{ gap: 1 }}>
              <LuGraduationCap size={18} /> Giáo viên
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField fullWidth margin="normal" label="Họ và tên" name="fullName" value={form.fullName} onChange={handleChange} autoFocus autoComplete="name" />
          <TextField fullWidth margin="normal" label="Tên đăng nhập" name="username" value={form.username} onChange={handleChange} autoComplete="username" />
          <TextField
            fullWidth margin="normal" label="Mật khẩu" name="password"
            value={form.password} onChange={handleChange}
            type={showPassword ? 'text' : 'password'} autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" tabIndex={-1}>
                    {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField fullWidth margin="normal" label="Xác nhận mật khẩu" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type={showPassword ? 'text' : 'password'} autoComplete="new-password" />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mt: 2, mb: 2 }}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
          <Typography textAlign="center" variant="body2">
            Đã có tài khoản?{' '}
            <Link component={RouterLink} to={PATHS.LOGIN} fontWeight="bold">Đăng nhập</Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
