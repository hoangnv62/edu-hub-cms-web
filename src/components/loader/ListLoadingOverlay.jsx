import { Box, CircularProgress, Typography } from '@mui/material';

export default function ListLoadingOverlay({ isLoading, message, children }) {
  if (!isLoading) return children;
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={2}
      p={4}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
