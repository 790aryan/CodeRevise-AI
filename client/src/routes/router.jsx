import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout.jsx';
import { DashboardPage } from '@/pages/DashboardPage.jsx';
import { LandingPage } from '@/pages/LandingPage.jsx';
import { NotFoundPage } from '@/pages/NotFoundPage.jsx';
import { LoginPage } from '@/pages/LoginPage.jsx';
import { RegisterPage } from '@/pages/RegisterPage.jsx';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute.jsx';
import { RevisionsPage } from '@/pages/RevisionsPage.jsx';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },

      {
      path: '/revisions',
        element: (
          <ProtectedRoute>
            <RevisionsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  

  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
]);
