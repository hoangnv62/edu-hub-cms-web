import {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
    Box, Button, Card, CardContent, Checkbox,
    FormControlLabel, IconButton, InputAdornment, Link, TextField, Typography,
} from '@mui/material';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import {Authority} from '@/constants/authority';
import {PATHS} from '@/routes/paths';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';

const LoginPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({username: '', password: '', isRememberMe: false});
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            toast.error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
            return;
        }

        try {
            setLoading(true);
            const user = await login(form);
            toast.success('Đăng nhập thành công');
            navigate(user.role === Authority.TEACHER ? PATHS.TEACHER.ROOT : PATHS.STUDENT.ROOT, {replace: true});
        } catch (error) {
            toast.error(error?.response?.data?.errorDescription || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{width: '100%', maxWidth: 420, mx: 2, boxShadow: 3}}>
            <CardContent sx={{p: 4}}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary" mb={0.5}>
                    EduHub
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                    Nền tảng học toán trực tuyến
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth margin="normal" label="Tên đăng nhập"
                        name="username" value={form.username} onChange={handleChange}
                        autoFocus autoComplete="username"
                    />
                    <TextField
                        fullWidth margin="normal" label="Mật khẩu"
                        name="password" value={form.password} onChange={handleChange}
                        type={showPassword ? 'text' : 'password'} autoComplete="current-password"
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
                    <FormControlLabel
                        control={<Checkbox name="isRememberMe" checked={form.isRememberMe} onChange={handleChange}/>}
                        label="Ghi nhớ đăng nhập"
                    />
                    <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
                            sx={{mt: 1.5, mb: 2}}>
                        {loading ? "Đang đăng nhâp" : "Đăng nhập"}
                    </Button>
                    <Typography textAlign="center" variant="body2">
                        Chưa có tài khoản?{' '}
                        <Link component={RouterLink} to={PATHS.REGISTER} fontWeight="bold">Đăng ký ngay</Link>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default LoginPage;
