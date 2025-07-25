// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
