import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/jwt.context';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CssBaseline />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
