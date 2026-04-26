import { useState } from 'react';
import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, MenuItem, Stack, TextField,
} from '@mui/material';
import { useClassMutations } from '@/hooks/queries/class/useClassMutations';
import { GRADE_OPTIONS } from '@/constants/grade';

// initialValues: { name, grade, description } — truyền từ row khi edit, undefined khi create
const CreateClassFormView = ({ open, onClose, editId, initialValues, onSuccess }) => {
  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    gradeLevel: initialValues?.grade ?? '',
    description: initialValues?.description ?? '',
  });

  const { createClass, updateClass, loading } = useClassMutations();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    const payload = { name: form.name, gradeLevel: form.gradeLevel, description: form.description };
    if (editId) {
      await updateClass(editId, payload, () => { onSuccess?.(); onClose(); });
    } else {
      await createClass(payload, () => { onSuccess?.(); onClose(); });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editId ? 'Cập nhật lớp học' : 'Tạo lớp học mới'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Tên lớp"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            select
            label="Khối"
            value={form.gradeLevel}
            onChange={handleChange('gradeLevel')}
            fullWidth
            required
            disabled={loading}
          >
            {GRADE_OPTIONS.map((g) => (
              <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Mô tả"
            value={form.description}
            onChange={handleChange('description')}
            fullWidth
            multiline
            rows={3}
            disabled={loading}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : editId ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClassFormView;
