import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

import {
  APP_ROUTES,
  type RouteConfig,
} from './components/routes/config/routes';

function App() {
  const createPrivateOrPublicRouteElement = (route: RouteConfig) => {
    if (route.isPrivate) return <PrivateRoute>{route.element}</PrivateRoute>;
    if (route.isPublic) return <PublicRoute>{route.element}</PublicRoute>;
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
