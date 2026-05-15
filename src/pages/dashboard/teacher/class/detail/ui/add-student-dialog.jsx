import { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, Divider, IconButton, InputAdornment, List, ListItem,
  ListItemText, TextField, Typography,
} from '@mui/material';
import { LuPlus, LuSearch } from 'react-icons/lu';
import { userService } from '@/services/user.service';
import { useClassStudentMutations } from '@/hooks/queries/class/useClassStudentMutations';
import { useDebounce } from '@/hooks/useDebounce';

const AddStudentDialog = ({ open, onClose, classId, onSuccess }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addingIds, setAddingIds] = useState(new Set());

  const debouncedKeyword = useDebounce(keyword, 500);
  const { addStudent } = useClassStudentMutations();

  useEffect(() => {
    if (!debouncedKeyword.trim()) { setResults([]); return; }
    const search = async () => {
      setSearching(true);
      try {
        const data = await userService.searchStudents({ keyword: debouncedKeyword });
        setResults(data?.content ?? []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    };
    search();
  }, [debouncedKeyword]);

  const handleAdd = async (student) => {
    setAddingIds((prev) => new Set([...prev, student.id]));
    await addStudent(classId, student.id, () => {
      onSuccess?.();
    });
    setAddingIds((prev) => { const s = new Set(prev); s.delete(student.id); return s; });
  };

  const handleClose = () => {
    setKeyword('');
    setResults([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thêm học sinh vào lớp</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Tìm kiếm học sinh theo tên, email..."
          fullWidth
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ mt: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LuSearch size={18} />
                </InputAdornment>
              ),
              endAdornment: searching && (
                <InputAdornment position="end">
                  <CircularProgress size={16} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ mt: 2, minHeight: 120 }}>
          {!keyword.trim() ? (
            <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
              Nhập tên hoặc email để tìm kiếm học sinh
            </Typography>
          ) : results.length === 0 && !searching ? (
            <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
              Không tìm thấy học sinh
            </Typography>
          ) : (
            <List disablePadding>
              {results.map((student, idx) => (
                <Box key={student.id}>
                  {idx > 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <IconButton
                        color="primary"
                        disabled={addingIds.has(student.id)}
                        onClick={() => handleAdd(student)}
                      >
                        {addingIds.has(student.id)
                          ? <CircularProgress size={18} />
                          : <LuPlus size={18} />}
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={student.name}
                      secondary={student.email}
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentDialog;
