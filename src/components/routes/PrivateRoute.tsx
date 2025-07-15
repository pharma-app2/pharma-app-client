import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from '../../store';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userInfo } = useSelector((state: RootState) => state.signIn);
  const location = useLocation();

  // E se o usuario tiver um token jwt mas não tiver userInfo?
  if (!userInfo) {
    return (
      <Navigate to="/signin/pacientes" replace state={{ from: location }} />
    );
  }

  return children;
};

export default PrivateRoute;
