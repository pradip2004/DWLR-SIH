import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllDWLRs from './pages/AllDWLRs';
import Alert from './pages/Alert';
import Report from './pages/Report';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TrainingModel from './pages/TrainingModel';
import { DwlrProvider } from './context/DwlrContext';




// Create the router without explicitly typing it as RouteObject[]
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
        path: "/analytics/training_model",
        element: <TrainingModel />
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
