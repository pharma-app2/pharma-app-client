import { Typography, Container } from '@mui/material';

const DashboardPage = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ textAlign: 'center', mt: 8, py: 4 }}
    >
      <Typography
        variant="h1"
        component="h1"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        DASHBOARD
      </Typography>
    </Container>
  );
};

export default DashboardPage;
