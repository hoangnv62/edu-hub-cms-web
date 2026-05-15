import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import TableLoadingSkeleton from '@/components/loader/TableLoadingSkeleton';
import AppTablePagination from '@/components/common/AppTablePagination';
import ExerciseTableRow from './ui/exercise-table-row';

const COLUMNS = [
  { label: 'STT', width: 60 },
  { label: 'Tên bài tập' },
  { label: 'Mô tả' },
  { label: 'Loại' },
  { label: 'Ngày tạo' },
  { label: 'Ngày hết hạn' },
  { label: 'Số lớp giao', align: 'center' },
  { label: 'Điểm TB', align: 'center' },
  { label: 'Trạng thái' },
  { label: 'Thao tác', align: 'right' },
];

const ExerciseListView = ({
  rows, loading, total, pagination,
  onEdit, onDelete, onToggleStatus,
  onPageChange, onRowsPerPageChange,
}) => (
  <Paper variant="outlined">
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            {COLUMNS.map((col) => (
              <TableCell key={col.label} width={col.width} align={col.align}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableLoadingSkeleton rowCount={5} colCount={COLUMNS.length} />
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={COLUMNS.length} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <ExerciseTableRow
                key={row.id}
                row={row}
                index={pagination.page * pagination.size + index}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <AppTablePagination
      count={total}
      page={pagination.page}
      rowsPerPage={pagination.size}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  </Paper>
);

export default ExerciseListView;
