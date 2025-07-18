import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import type { AppDispatch, RootState } from '../store';
import {
  createAvailability,
  deleteAvailability,
  fetchSchedule,
} from '../store/slices/schedules/scheduleSlice';
import CalendarGrid from '../components/CalendarGrid';
import { useNavigate } from 'react-router-dom';
import { EventType, type CalendarEvent } from '../types/schedule';

const DURATIONS = [15, 30, 45, 60];

const AvailabilityCreatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { events, status } = useSelector((state: RootState) => state.schedule);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [slotDuration, setSlotDuration] = useState(30);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // NOVO: Estado para o diálogo de deleção
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  ); // NOVO: Estado para o evento selecionado
  const [selectedSlot, setSelectedSlot] = useState<Dayjs | null>(null);

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

  const handleSlotClick = (slotDate: Dayjs) => {
    setSelectedSlot(slotDate); // Salva o slot clicado
    setIsCreateDialogOpen(true); // Abre o diálogo
  };

  const handleCloseDialogs = () => {
    setIsCreateDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.type === EventType.AVAILABILITY) {
      setSelectedEvent(event);
      setIsDeleteDialogOpen(true); // Abre o diálogo de DELEÇÃO
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      dispatch(deleteAvailability(selectedEvent.id));
    }
    handleCloseDialogs();
  };

  const handleCreateAvailability = () => {
    if (!selectedSlot) return;

    dispatch(
      createAvailability({
        startTime: selectedSlot.toISOString(),
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
    handleCloseDialogs();
  };

  const handleNavigateToCreateAppointment = () => {
    if (!selectedSlot) return;
    // Navega para a outra página, passando a data e hora como state
    navigate('/farmaceutico/agendamentos/novo', {
      state: { initialDate: selectedSlot.toISOString() },
    });
    handleCloseDialogs();
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
          onEventClick={handleEventClick}
        />
      )}

      <Dialog
        open={isCreateDialogOpen}
        onClose={handleCloseDialogs}
        aria-labelledby="action-dialog-title"
      >
        <DialogTitle id="action-dialog-title">
          Qual ação deseja realizar?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você selecionou o horário de {selectedSlot?.format('HH:mm')} do dia{' '}
            {selectedSlot?.format('DD/MM/YYYY')}.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialogs} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleNavigateToCreateAppointment}
            variant="outlined"
          >
            Agendar para Paciente
          </Button>
          <Button
            onClick={handleCreateAvailability}
            variant="contained"
            autoFocus
          >
            Criar Disponibilidade
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialogs}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja remover o horário disponível de{' '}
            <strong>{dayjs(selectedEvent?.startTime).format('HH:mm')}</strong>{' '}
            do dia{' '}
            <strong>
              {dayjs(selectedEvent?.startTime).format('DD/MM/YYYY')}
            </strong>
            ? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialogs} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Sim, Excluir Horário
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AvailabilityCreatePage;
