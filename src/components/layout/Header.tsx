// src/components/layout/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
// import { logoutUser } from '../../store/slices/auth/authThunk';

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.signIn);
  //   const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    // dispatch(logoutUser());
    console.log('Logout');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            PharmaApp
          </RouterLink>
        </Typography>
        {userInfo ? (
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        ) : (
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/signin/pacientes"
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/cadastro/pacientes"
            >
              Cadastro
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
