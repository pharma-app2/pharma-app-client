import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

import {
  APP_ROUTES,
  type RouteConfig,
} from './components/routes/config/routes';
import { RouteProtection } from './components/routes/config/RouteProtection';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { useEffect } from 'react';
import { AuthStatus } from './store/slices/auth/AuthStatus';
import { checkAuthStatus } from './store/slices/auth/authThunk';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.signIn.authStatus);

  useEffect(() => {
    // Dispara a verificação apenas se ainda não tivermos tentado
    if (authStatus === AuthStatus.IDLE) {
      dispatch(checkAuthStatus());
    }
  }, [authStatus, dispatch]);

  // TODO: change to spinner
  if (authStatus === AuthStatus.IDLE || authStatus === AuthStatus.LOADING) {
    return <div>Carregando sua sessão...</div>;
  }

  const createPrivateOrPublicRouteElement = (route: RouteConfig) => {
    if (route.routeProtection === RouteProtection.PRIVATE)
      return <PrivateRoute>{route.element}</PrivateRoute>;
    if (route.routeProtection === RouteProtection.PUBLIC)
      return <PublicRoute>{route.element}</PublicRoute>;
    return route.element;
  };

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
        {Object.values(APP_ROUTES).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={createPrivateOrPublicRouteElement(route)}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
