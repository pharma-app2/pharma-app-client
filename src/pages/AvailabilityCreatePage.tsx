import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Para nomes de dias em português
dayjs.locale('pt-br');

// MUI Components
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Redux e Lógica
import type { AppDispatch, RootState } from '../store';
import {
  createAvailability,
  fetchSchedule,
} from '../store/slices/schedules/scheduleSlice';
import CalendarGrid from '../components/CalendarGrid';

const DURATIONS = [15, 30, 45, 60];

const AvailabilityCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status } = useSelector((state: RootState) => state.schedule);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [slotDuration, setSlotDuration] = useState(30);

  const startOfWeek = useMemo(() => currentDate.startOf('week'), [currentDate]);
  const endOfWeek = useMemo(() => currentDate.endOf('week'), [currentDate]);

  useEffect(() => {
    dispatch(
      fetchSchedule({
        startDate: startOfWeek.format('YYYY-MM-DD'), // Envia apenas a data. Ex: "2025-07-13"
        endDate: endOfWeek.format('YYYY-MM-DD'), // Ex: "2025-07-19"
      }),
    );
  }, [dispatch, startOfWeek, endOfWeek]);

  const handleSlotClick = (slotDate: dayjs.Dayjs) => {
    // Lógica para confirmar e criar o agendamento
    if (
      window.confirm(
        `Criar disponibilidade de ${slotDuration} min em ${slotDate.format('DD/MM HH:mm')}?`,
      )
    ) {
      dispatch(
        createAvailability({
          startTime: slotDate.toISOString(),
          durationMinutes: slotDuration,
        }),
      ).then(() => {
        // Recarrega os eventos após criar um novo
        dispatch(
          fetchSchedule({
            startDate: startOfWeek.format('YYYY-MM-DD'),
            endDate: endOfWeek.format('YYYY-MM-DD'),
          }),
        );
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      {/* O resto do seu JSX continua exatamente o mesmo */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Criar Horários
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={() => setCurrentDate(currentDate.subtract(1, 'week'))}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Semana Anterior
          </Button>
          <Typography variant="h6">
            {startOfWeek.format('D MMM')} - {endOfWeek.format('D MMM, YYYY')}
          </Typography>
          <Button
            onClick={() => setCurrentDate(currentDate.add(1, 'week'))}
            endIcon={<ArrowForwardIosIcon />}
          >
            Próxima Semana
          </Button>
        </Box>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Duração do Atendimento</InputLabel>
          <Select
            value={slotDuration}
            label="Duração do Atendimento"
            onChange={(e) => setSlotDuration(e.target.value as number)}
            size="small"
          >
            {DURATIONS.map((d) => (
              <MenuItem key={d} value={d}>
                {d} minutos
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {status === 'loading' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <CalendarGrid
          startOfWeek={startOfWeek}
          slotDuration={slotDuration}
          events={events}
          onSlotClick={handleSlotClick}
        />
      )}
    </Container>
  );
};

export default AvailabilityCreatePage;
