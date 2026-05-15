import { Box, Chip, IconButton, Switch, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  EXERCISE_STATUS,
  EXERCISE_STATUS_COLOR,
  EXERCISE_STATUS_LABEL,
  EXERCISE_TYPE_COLOR,
  EXERCISE_TYPE_LABEL,
} from '@/constants/exercise';
import { PATHS } from '@/routes/paths';
import { formatDateTime } from '@/utils/format-date';

const ExerciseTableRow = ({ row, index, onEdit, onDelete, onToggleStatus }) => {
  const navigate = useNavigate();
  const isFinished = row.status === EXERCISE_STATUS.FINISH;

  const handleViewQuestions = () => {
    navigate(generatePath(PATHS.TEACHER.EXERCISE_QUESTIONS, { exerciseId: row.id }));
  };

  const handleToggle = () => {
    const next = row.status === EXERCISE_STATUS.ACTIVE ? EXERCISE_STATUS.INACTIVE : EXERCISE_STATUS.ACTIVE;
    onToggleStatus(row, next);
  };

  return (
    <TableRow hover>
      <TableCell>{index + 1}</TableCell>
      <TableCell sx={{ maxWidth: 160 }}>
        <Typography variant="body2" noWrap title={row.name}>{row.name}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: 200 }}>
        <Typography variant="body2" noWrap color="text.secondary" title={row.description}>
          {row.description || '—'}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={EXERCISE_TYPE_LABEL[row.type] ?? row.type}
          size="small"
          color={EXERCISE_TYPE_COLOR[row.type] ?? 'default'}
          variant="outlined"
        />
      </TableCell>
      <TableCell>{formatDateTime(row.dateCreated)}</TableCell>
      <TableCell>{formatDateTime(row.dueDate)}</TableCell>
      <TableCell align="center">{row.numOfClasses ?? 0}</TableCell>
      <TableCell align="center">
        {row.averageScore != null ? row.averageScore.toFixed(1) : 0}
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Chip
            label={EXERCISE_STATUS_LABEL[row.status] ?? row.status}
            size="small"
            color={EXERCISE_STATUS_COLOR[row.status] ?? 'default'}
          />
          {!isFinished && (
            <Tooltip title={row.status === EXERCISE_STATUS.ACTIVE ? 'Tắt hoạt động' : 'Bật hoạt động'}>
              <Switch
                size="small"
                checked={row.status === EXERCISE_STATUS.ACTIVE}
                onChange={handleToggle}
                color="success"
              />
            </Tooltip>
          )}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Xem câu hỏi">
          <IconButton size="small" color="info" onClick={handleViewQuestions}>
            <LuEye size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cập nhật">
          <IconButton size="small" color="primary" onClick={() => onEdit(row)}>
            <LuPencil size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton size="small" color="error" onClick={() => onDelete(row)}>
            <LuTrash2 size={18} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ExerciseTableRow;
