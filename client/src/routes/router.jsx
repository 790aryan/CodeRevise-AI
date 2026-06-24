import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout.jsx';
import { DashboardPage } from '@/pages/DashboardPage.jsx';
import { LandingPage } from '@/pages/LandingPage.jsx';
import { NotFoundPage } from '@/pages/NotFoundPage.jsx';
import { LoginPage } from '@/pages/LoginPage.jsx';
import { RegisterPage } from '@/pages/RegisterPage.jsx';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute.jsx';
import { RevisionsPage } from '@/pages/RevisionsPage.jsx';
import ProblemsPage from '@/pages/ProblemsPage.jsx';
import AddProblemPage from '@/pages/AddProblemPage.jsx';
import ProblemDetailPage from '@/pages/ProblemDetailPage.jsx';
import RevisionSessionsPage from '@/pages/RevisionSessionsPage.jsx';
import CreateRevisionSessionPage from '@/pages/CreateRevisionSessionPage.jsx';
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

      {
        path: '/problems',
        element: (
          <ProtectedRoute>
            <ProblemsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/problems/:id',
        element: (
          <ProtectedRoute>
            <ProblemDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/problems/new',
        element: (
          <ProtectedRoute>
            <AddProblemPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/revision-sessions',
        element: (
          <ProtectedRoute>
            <RevisionSessionsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/revision-sessions/new',
        element: (
          <ProtectedRoute>
            <CreateRevisionSessionPage />
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
