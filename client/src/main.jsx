import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router.jsx';
import { AuthProvider } from '@/context/AuthContext.jsx';
import '@/styles/global.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>

  <RouterProvider router={router} />

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,

      style: {
        background: '#091413',
        color: '#FBE8CE',
        border: '1px solid #285A48',
      },

      success: {
        iconTheme: {
          primary: '#9AB17A',
          secondary: '#091413',
        },
      },

      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#091413',
        },
      },
    }}
  />

</AuthProvider>
</StrictMode>
);
