import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { DwlrProvider } from './context/DwlrContext';
import './index.css';
import Alert from './pages/Alert';
import AllDWLRs from './pages/AllDWLRs';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Report from './pages/Report';
import SignupPage from './pages/SignupPage';





const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/all-dwlrs',
        element: <AllDWLRs />,
      },
      {
        path: '/alert',
        element: <Alert />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/analytics',
        element:<Analytics />
      },
      {
        path: '/notfound',
        element: <NotFound />
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth/signin',
    element: <LoginPage />
  },
  {
    path: '/auth/signup',
    element: <SignupPage />
  },
  
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DwlrProvider>
    <RouterProvider router={router} />
  </DwlrProvider>
  </StrictMode>,
);
