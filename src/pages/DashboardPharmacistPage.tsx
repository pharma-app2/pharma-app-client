import { Container, Typography, Box } from '@mui/material';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DashboardCard from '../components/DashboardCard';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../store';
import EventNoteIcon from '@mui/icons-material/EventNote';

const dashboardItems = [
  {
    icon: <MedicalServicesIcon />,
    title: 'Minhas Receitas',
    description:
      'Visualize e gerencie suas receitas médicas ativas e passadas.',
    path: '/receitas',
  },
  {
    icon: <EventNoteIcon />,
    title: 'Mina Agenda',
    description: 'Veja seus próximos agendamentos.',
    path: '/agendamentos/farmaceutico',
  },
];

const DashboardPharmacistPage = () => {
  const { userInfo } = useSelector((state: RootState) => state.signIn);
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    setFirstName(userInfo?.fullName.split(' ').at(0) ?? '');
  }, [userInfo]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo(a), {firstName}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Acesse rapidamente os serviços disponíveis.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {dashboardItems.map((item) => (
          <DashboardCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            path={item.path}
          />
        ))}
      </Box>
    </Container>
  );
};

export default DashboardPharmacistPage;
