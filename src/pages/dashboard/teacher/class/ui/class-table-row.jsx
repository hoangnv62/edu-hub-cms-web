import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import { LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';
import { useNavigate, generatePath } from 'react-router-dom';
import { GRADE_LABEL } from '@/constants/grade';
import { PATHS } from '@/routes/paths';

const ClassTableRow = ({ row, index, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(generatePath(PATHS.TEACHER.CLASS_DETAIL, { classId: row.id }));
  };

  return (
    <TableRow hover>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <Chip
          label={GRADE_LABEL[row.grade] ?? row.grade}
          size="small"
          color="primary"
          variant="outlined"
        />
      </TableCell>
      <TableCell>{row.numOfStudents}</TableCell>
      <TableCell align="right">
        <IconButton size="small" color="info" onClick={handleNavigate}>
          <LuEye size={18} />
        </IconButton>
        <IconButton size="small" color="primary" onClick={() => onEdit(row)}>
          <LuPencil size={18} />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => onDelete(row)}>
          <LuTrash2 size={18} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ClassTableRow;
