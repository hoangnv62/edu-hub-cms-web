import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { LuSearch } from 'react-icons/lu';
import { EXERCISE_TYPE_OPTIONS } from '@/constants/exercise';

const ExerciseFilter = ({ keyword, onKeywordChange, type, onTypeChange }) => (
  <Stack direction="row" spacing={2} mb={3}>
    <TextField
      placeholder="Tìm kiếm tên bài tập..."
      size="small"
      value={keyword}
      onChange={onKeywordChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LuSearch size={18} />
            </InputAdornment>
          ),
        },
      }}
      sx={{ width: 280 }}
    />
    <TextField
      select
      size="small"
      label="Loại bài tập"
      value={type}
      onChange={onTypeChange}
      sx={{ width: 180 }}
    >
      <MenuItem value="">Tất cả</MenuItem>
      {EXERCISE_TYPE_OPTIONS.map((t) => (
        <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
      ))}
    </TextField>
  </Stack>
);

export default ExerciseFilter;
