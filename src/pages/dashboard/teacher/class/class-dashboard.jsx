import {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from '@mui/material';
import {useClasses} from '@/hooks/queries/class/useClasses';
import {useClassMutations} from '@/hooks/queries/class/useClassMutations';
import {useDebounce} from '@/hooks/useDebounce';
import ClassHeader from './ui/class-header';
import ClassFilter from './ui/class-filter.jsx';
import ClassListView from './class-list-view';
import CreateClassFormView from './create-class-form-view';
import { LuPlus } from 'react-icons/lu';

const DEFAULT_PAGE = {page: 0, size: 20};

const ClassDashboard = () => {
    const [keyword, setKeyword] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [pagination, setPagination] = useState(DEFAULT_PAGE);
    const [formOpen, setFormOpen] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const debouncedKeyword = useDebounce(keyword, 1000);
    const params = {keyword: debouncedKeyword, gradeLevel, ...pagination};

    const {classes, loading, refetch} = useClasses(params);
    const {deleteClass, loading: deleting} = useClassMutations();

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
        setPagination((prev) => ({...prev, page: 0}));
    };

    const handleGradeChange = (e) => {
        setGradeLevel(e.target.value);
        setPagination((prev) => ({...prev, page: 0}));
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
        await deleteClass(deleteTarget.id, () => {
            setDeleteTarget(null);
            refetch();
        });
    };

    return (
        <Box>
            <ClassHeader/>
            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center"
                   width="100%"
                   flexWrap="wrap">
                <Box flex={1}>

                    <ClassFilter
                        keyword={keyword}
                        onKeywordChange={handleKeywordChange}
                        gradeLevel={gradeLevel}
                        onGradeChange={handleGradeChange}
                    />
                </Box>
                <Button variant="contained" startIcon={<LuPlus size={18} />} onClick={handleOpenCreate}>
                    Tạo lớp học
                </Button>
            </Stack>

            <ClassListView
                rows={classes?.content ?? []}
                loading={loading}
                total={classes?.totalElements ?? 0}
                pagination={pagination}
                onEdit={handleOpenEdit}
                onDelete={setDeleteTarget}
                onPageChange={(newPage) => setPagination((prev) => ({...prev, page: newPage}))}
                onRowsPerPageChange={(newSize) => setPagination({page: 0, size: newSize})}
            />

            {formOpen && (
                <CreateClassFormView
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
                    Bạn có chắc chắn muốn xóa lớp <strong>{deleteTarget?.name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>Hủy</Button>
                    <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={deleting}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ClassDashboard;
