import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

import { AuthStatus } from './store/slices/auth/authStatus';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthStatus } from './store/slices/auth/authThunk';
import type { AppDispatch, RootState } from './store';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { authStatus } = useSelector((state: RootState) => state.signIn);

  useEffect(() => {
    if (authStatus === AuthStatus.IDLE) {
      dispatch(checkAuthStatus());
    }
  }, [authStatus, dispatch]);

  if (authStatus === AuthStatus.IDLE || authStatus === AuthStatus.LOADING) {
    return <div>Carregando sua sessão...</div>;
  }

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route
          path="/signin/pacientes"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/cadastro/pacientes"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute>{<DashboardPage />}</PrivateRoute>}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
