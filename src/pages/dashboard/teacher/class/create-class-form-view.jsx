import { useState } from 'react';
import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, MenuItem, Stack, TextField,
} from '@mui/material';
import { useClassMutations } from '@/hooks/queries/class/useClassMutations';
import { GRADE_OPTIONS } from '@/constants/grade';

const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Tên lớp không được để trống';
  }

  if (!form.gradeLevel) {
    errors.gradeLevel = 'Vui lòng chọn khối';
  }

  return errors;
};

const CreateClassFormView = ({ open, onClose, editId, initialValues, onSuccess }) => {
  const [form, setForm] = useState({
    name: initialValues?.name ?? '',
    gradeLevel: initialValues?.grade ?? '',
    description: initialValues?.description ?? '',
  });
  const [errors, setErrors] = useState({});

  const { createClass, updateClass, loading } = useClassMutations();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name: form.name.trim(),
      gradeLevel: form.gradeLevel,
      description: form.description,
    };

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
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            select
            label="Khối"
            value={form.gradeLevel}
            onChange={handleChange('gradeLevel')}
            fullWidth
            required
            disabled={loading}
            error={!!errors.gradeLevel}
            helperText={errors.gradeLevel}
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
