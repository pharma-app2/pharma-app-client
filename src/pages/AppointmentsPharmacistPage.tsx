// src/pages/AppointmentsPharmacistPage.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';

// Componentes do MUI
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// Lógica do Redux e Tipos
import {
  AppointmentStatus,
  type AppointmentStatusValue,
} from '../types/appointment';
import type { AppDispatch, RootState } from '../store';
import { fetchPharmacistAppointments } from '../store/slices/appointments/pharmacistAppointmentSlice';

const AppointmentsPharmacistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, status, error } = useSelector(
    (state: RootState) => state.pharmacistAppointments,
  );

  useEffect(() => {
    // Busca os agendamentos apenas na primeira carga do componente
    if (status === 'idle') {
      dispatch(fetchPharmacistAppointments());
    }
  }, [status, dispatch]);

  const getStatusChipColor = (status: AppointmentStatusValue) => {
    switch (status) {
      case AppointmentStatus.CONFIRMADO:
        return 'primary';
      case AppointmentStatus.AGENDADO:
        return 'primary';
      case AppointmentStatus.CONCLUIDO:
        return 'success';
      case AppointmentStatus.CANCELADO:
        return 'error';
      default:
        return 'default';
    }
  };

  const renderAppointmentsList = () => {
    if (status === 'loading') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (status === 'failed') {
      return (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      );
    }
    if (status === 'succeeded' && appointments.length === 0) {
      return (
        <Typography sx={{ my: 4, textAlign: 'center' }}>
          Você ainda não possui consultas agendadas.
        </Typography>
      );
    }
    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Data e Hora</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.patientName}</TableCell>
                <TableCell>
                  {dayjs(appt.date).format('DD/MM/YYYY [às] HH:mm')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={appt.status}
                    color={getStatusChipColor(appt.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Gerenciar Agendamentos
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EventAvailableIcon />}
            component={RouterLink}
            to="/farmaceutico/horarios/novo" // Rota para criar novos horários
          >
            Criar Horários Disponíveis
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/farmaceutico/agendamentos/novo" // Rota para criar uma nova consulta para um paciente
          >
            Agendar Consulta
          </Button>
        </Box>
      </Box>

      <Divider />

      {/* Lista de Agendamentos */}
      <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
        Próximas Consultas
      </Typography>
      {renderAppointmentsList()}
    </Container>
  );
};

export default AppointmentsPharmacistPage;
