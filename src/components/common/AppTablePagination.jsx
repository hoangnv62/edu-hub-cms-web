import { TablePagination } from '@mui/material';

const AppTablePagination = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => (
  <TablePagination
    component="div"
    count={count}
    page={page}
    rowsPerPage={rowsPerPage}
    rowsPerPageOptions={[10, 20, 50]}
    onPageChange={(_, newPage) => onPageChange(newPage)}
    onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
    labelRowsPerPage="Số hàng:"
    labelDisplayedRows={({ from, to, count: total }) => `${from}–${to} / ${total}`}
  />
);

export default AppTablePagination;
