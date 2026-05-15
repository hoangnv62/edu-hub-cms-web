import { useState } from 'react';
import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, FormHelperText, InputLabel,
  MenuItem, Select, Stack, TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useExerciseMutations } from '@/hooks/queries/exercise/useExerciseMutations';
import { EXERCISE_TYPE_OPTIONS } from '@/constants/exercise';
import { toApiDateTime } from '@/utils/format-date';

const validate = (form, isEdit) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Tên bài tập không được để trống';
  }
  if (!form.type) {
    errors.type = 'Vui lòng chọn loại bài tập';
  }
  if (!form.dueDate || !form.dueDate.isValid()) {
    errors.dueDate = 'Vui lòng chọn ngày hết hạn';
  } else if (!isEdit && form.dueDate.valueOf() <= Date.now()) {
    errors.dueDate = 'Ngày hết hạn phải sau thời điểm hiện tại';
  }

  return errors;
};

const CreateExerciseFormView = ({ open, onClose, editId, initialValues, onSuccess }) => {
  const [form, setForm] = useState({
    name:        initialValues?.name        ?? '',
    description: initialValues?.description ?? '',
    type:        initialValues?.type        ?? '',
    dueDate:     initialValues?.dueDate ? dayjs(initialValues.dueDate) : null,
  });
  const [errors, setErrors] = useState({});

  const { createExercise, updateExercise, loading } = useExerciseMutations();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleDateChange = (newValue) => {
    setForm((prev) => ({ ...prev, dueDate: newValue }));
    if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: '' }));
  };

  const handleSubmit = async () => {
    const newErrors = validate(form, !!editId);
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const payload = {
      name:        form.name.trim(),
      description: form.description,
      type:        form.type,
      dueDate:     toApiDateTime(form.dueDate),
    };

    if (editId) {
      await updateExercise(editId, payload, () => { onSuccess?.(); onClose(); });
    } else {
      await createExercise(payload, () => { onSuccess?.(); onClose(); });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editId ? 'Cập nhật bài tập' : 'Thêm bài tập mới'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>

          <TextField
            label="Tên bài tập"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth required disabled={loading}
            error={!!errors.name} helperText={errors.name}
          />

          <FormControl fullWidth required disabled={loading} error={!!errors.type}>
            <InputLabel>Loại bài tập</InputLabel>
            <Select label="Loại bài tập" value={form.type} onChange={handleChange('type')}>
              {EXERCISE_TYPE_OPTIONS.map((t) => (
                <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
              ))}
            </Select>
            {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
          </FormControl>

          <DateTimePicker
            label="Ngày hết hạn *"
            value={form.dueDate}
            onChange={handleDateChange}
            disabled={loading}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.dueDate,
                helperText: errors.dueDate,
              },
            }}
          />

          <TextField
            label="Mô tả"
            value={form.description}
            onChange={handleChange('description')}
            fullWidth multiline rows={3} disabled={loading}
          />

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading
            ? <CircularProgress size={20} color="inherit" />
            : editId ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateExerciseFormView;
