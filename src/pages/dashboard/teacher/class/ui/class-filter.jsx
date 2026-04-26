import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { LuSearch } from 'react-icons/lu';
import { GRADE_OPTIONS } from '@/constants/grade';

const ClassFilter = ({ keyword, onKeywordChange, gradeLevel, onGradeChange }) => (
  <Stack direction="row" spacing={2} mb={3}>
    <TextField
      placeholder="Tìm kiếm tên lớp..."
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
      label="Khối"
      value={gradeLevel}
      onChange={onGradeChange}
      sx={{ width: 160 }}
    >
      <MenuItem value="">Tất cả khối</MenuItem>
      {GRADE_OPTIONS.map((g) => (
        <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
      ))}
    </TextField>
  </Stack>
);

export default ClassFilter;
