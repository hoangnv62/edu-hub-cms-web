import { useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  InputAdornment, Paper, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField,
} from '@mui/material';
import { LuSearch, LuUserPlus } from 'react-icons/lu';
import { useClassStudents } from '@/hooks/queries/class/useClassStudents';
import { useClassStudentMutations } from '@/hooks/queries/class/useClassStudentMutations';
import { useDebounce } from '@/hooks/useDebounce';
import AppTablePagination from '@/components/common/AppTablePagination';
import TableLoadingSkeleton from '@/components/loader/TableLoadingSkeleton';
import StudentTableRow from './ui/student-table-row';
import AddStudentDialog from './ui/add-student-dialog';

const DEFAULT_PAGE = { page: 0, size: 20 };
const COL_COUNT = 6;

const StudentsTab = ({ classId }) => {
  const [keyword, setKeyword] = useState('');
  const [pagination, setPagination] = useState(DEFAULT_PAGE);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 1000);
  const params = { keyword: debouncedKeyword, ...pagination };

  const { students, loading, refetch } = useClassStudents(classId, params);
  const { removeStudent, loading: removing } = useClassStudentMutations();

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  const handleConfirmDelete = async () => {
    await removeStudent(classId, deleteTarget.id, () => {
      setDeleteTarget(null);
      refetch();
    });
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
        <TextField
          placeholder="Tìm kiếm học sinh..."
          size="small"
          value={keyword}
          onChange={handleKeywordChange}
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
        <Button
          variant="contained"
          startIcon={<LuUserPlus size={18} />}
          onClick={() => setAddDialogOpen(true)}
        >
          Thêm học sinh
        </Button>
      </Stack>

      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell width={60}>STT</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ngày tham gia</TableCell>
                <TableCell align="center">Điểm TB</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableLoadingSkeleton rowCount={5} colCount={COL_COUNT} />
              ) : (students?.content ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={COL_COUNT} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    Không có học sinh nào trong lớp
                  </TableCell>
                </TableRow>
              ) : (
                (students?.content ?? []).map((row, index) => (
                  <StudentTableRow
                    key={row.id}
                    row={row}
                    index={pagination.page * pagination.size + index}
                    onDelete={setDeleteTarget}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <AppTablePagination
          count={students?.totalElements ?? 0}
          page={pagination.page}
          rowsPerPage={pagination.size}
          onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
          onRowsPerPageChange={(newSize) => setPagination({ page: 0, size: newSize })}
        />
      </Paper>

      {addDialogOpen && (
        <AddStudentDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          classId={classId}
          onSuccess={refetch}
        />
      )}

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa <strong>{deleteTarget?.name}</strong> khỏi lớp?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={removing}>Hủy</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={removing}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsTab;
