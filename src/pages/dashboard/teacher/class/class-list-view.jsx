import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import TableLoadingSkeleton from '@/components/loader/TableLoadingSkeleton';
import AppTablePagination from '@/components/common/AppTablePagination';
import ClassTableRow from './ui/class-table-row';

const ClassListView = ({ rows, loading, total, pagination, onEdit, onDelete, onPageChange, onRowsPerPageChange }) => (
  <Paper variant="outlined">
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell width={60}>STT</TableCell>
            <TableCell>Tên lớp</TableCell>
            <TableCell>Khối</TableCell>
            <TableCell>Số học sinh</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableLoadingSkeleton rowCount={5} colCount={5} />
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <ClassTableRow
                key={row.id}
                row={row}
                index={pagination.page * pagination.size + index}
                onEdit={onEdit}
                onDelete={onDelete}
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

export default ClassListView;
