import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import type { RootState } from '../store';

const LandingPage = () => {
  const { userInfo, loading } = useSelector((state: RootState) => state.signIn);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (userInfo) {
    // A propriedade 'replace' substitui a entrada '/' no histórico
    // do navegador por '/dashboard', impedindo que o usuário fique preso
    // em um loop ao clicar no botão "voltar".
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/cadastro/pacientes" replace />;
};

export default LandingPage;
