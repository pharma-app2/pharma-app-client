import { Typography, Container } from '@mui/material';

const DashboardPage = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{}}>
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
