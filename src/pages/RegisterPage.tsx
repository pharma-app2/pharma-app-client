import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type AppDispatch, type RootState } from '../store';
import {
  clearError,
  resetRegistrationStatus,
} from '../store/slices/auth/authSlice';
import { type UserWithoutId } from '../types/user';
import { toast } from 'react-toastify';
import { registerUser } from '../store/slices/auth/authThunk';

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, userInfo, registrationSuccess } = useSelector(
    (state: RootState) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserWithoutId>();

  const onSubmitDispatchSlice: SubmitHandler<UserWithoutId> = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (registrationSuccess) {
      toast.success('Cadastro realizado! Por favor, faça seu login.');
      navigate('/login');
      dispatch(resetRegistrationStatus());
    }
  }, [error, userInfo, registrationSuccess, navigate, dispatch]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitDispatchSlice)}
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Nome Completo"
            autoFocus
            {...register('fullName', { required: 'O nome é obrigatório' })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            type="email"
            {...register('email', {
              required: 'O email é obrigatório',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Endereço de email inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            {...register('password', {
              required: 'A senha é obrigatória',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirme a Senha"
            type="password"
            id="password-confirmation"
            {...register('passwordConfirmation', {
              required: 'A senha é obrigatória',
              validate: (value) =>
                value === getValues('password') || 'As senhas não correspondem',
            })}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CPF"
            type="text"
            id="cpf"
            {...register('cpf', {
              required: 'O CPF é obrigatório',
              pattern: {
                value: /^\d{11}$/,
                message: 'CPF deve conter apenas 11 números',
              },
            })}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
