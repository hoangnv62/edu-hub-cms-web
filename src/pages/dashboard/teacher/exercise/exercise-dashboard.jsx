import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { LuPlus } from 'react-icons/lu';
import { useExercises } from '@/hooks/queries/exercise/useExercises';
import { useExerciseMutations } from '@/hooks/queries/exercise/useExerciseMutations';
import { useDebounce } from '@/hooks/useDebounce';
import ExerciseHeader from './ui/exercise-header';
import ExerciseFilter from './ui/exercise-filter';
import ExerciseListView from './exercise-list-view';
import CreateExerciseFormView from './create-exercise-form-view';

const DEFAULT_PAGE = { page: 0, size: 20 };

const ExerciseDashboard = () => {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('');
  const [pagination, setPagination] = useState(DEFAULT_PAGE);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedKeyword = useDebounce(keyword, 1000);
  const params = { keyword: debouncedKeyword, type, ...pagination };

  const { exercises, loading, refetch } = useExercises(params);
  const { deleteExercise, toggleStatus, loading: mutating } = useExerciseMutations();

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  const handleOpenCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (row) => {
    setEditTarget(row);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditTarget(null);
  };

  const handleConfirmDelete = async () => {
    await deleteExercise(deleteTarget.id, () => {
      setDeleteTarget(null);
      refetch();
    });
  };

  const handleToggleStatus = async (row) => {
    await toggleStatus(row.id, refetch);
  };

  return (
    <Box>
      <ExerciseHeader />
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" flexWrap="wrap">
        <Box flex={1}>
          <ExerciseFilter
            keyword={keyword}
            onKeywordChange={handleKeywordChange}
            type={type}
            onTypeChange={handleTypeChange}
          />
        </Box>
        <Button variant="contained" startIcon={<LuPlus size={18} />} onClick={handleOpenCreate}>
          Thêm bài tập
        </Button>
      </Stack>

      <ExerciseListView
        rows={exercises?.content ?? []}
        loading={loading}
        total={exercises?.totalElements ?? 0}
        pagination={pagination}
        onEdit={handleOpenEdit}
        onDelete={setDeleteTarget}
        onToggleStatus={handleToggleStatus}
        onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
        onRowsPerPageChange={(newSize) => setPagination({ page: 0, size: newSize })}
      />

      {formOpen && (
        <CreateExerciseFormView
          open={formOpen}
          onClose={handleFormClose}
          editId={editTarget?.id}
          initialValues={editTarget}
          onSuccess={refetch}
        />
      )}

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa bài tập <strong>{deleteTarget?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={mutating}>Hủy</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={mutating}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExerciseDashboard;
