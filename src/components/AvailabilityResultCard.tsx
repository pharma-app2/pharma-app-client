// src/components/appointments/availabilityResultCard.tsx
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { Availability } from '../types/availability';

interface AvailabilityResultCardProps {
  availability: Availability;
}

const AvailabilityResultCard = ({
  availability,
}: AvailabilityResultCardProps) => {
  return (
    <Card sx={{ display: 'flex', width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 60, height: 60 }}>
          {availability.pharmacistName.charAt(0)}
        </Avatar>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent>
          <Typography component="div" variant="h6">
            {availability.pharmacistName}
          </Typography>
          <Chip
            icon={<LocationOnIcon />}
            label={`${availability.neighborhood}, ${availability.city}`}
            variant="outlined"
            size="small"
            sx={{ my: 1 }}
          />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />
            Próximo horário:{' '}
            {dayjs(availability.nextAvailableSlot).format(
              'DD/MM/YYYY [às] HH:mm',
            )}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/agendamentos/confirmar/${availability.id}`}
          >
            Agendar
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AvailabilityResultCard;
