import { IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { LuTrash2 } from 'react-icons/lu';
import { formatDateTime } from '@/utils/format-date';

const StudentTableRow = ({ row, index, onDelete }) => (
  <TableRow hover>
    <TableCell>{index + 1}</TableCell>
    <TableCell>
      <Typography variant="body2" fontWeight={500}>{row.name}</Typography>
    </TableCell>
    <TableCell>{row.email || '—'}</TableCell>
    <TableCell>{formatDateTime(row.joinDate)}</TableCell>
    <TableCell align="center">
      {row.avgScore != null ? row.avgScore.toFixed(1) : '—'}
    </TableCell>
    <TableCell align="right">
      <Tooltip title="Xóa khỏi lớp">
        <IconButton size="small" color="error" onClick={() => onDelete(row)}>
          <LuTrash2 size={18} />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
);

export default StudentTableRow;
