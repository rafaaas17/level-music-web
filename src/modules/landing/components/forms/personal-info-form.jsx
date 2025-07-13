import { Box, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const PersonalInfoForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Nombre Completo"
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'El nombre es obligatorio' })}
      />

      <TextField
        label="Correo Electrónico"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          required: 'El correo es obligatorio',
          pattern: { value: /^\S+@\S+$/i, message: 'Formato inválido' }
        })}
      />

      <TextField
        label="Teléfono de Contacto"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register('phone', {
          required: 'El teléfono es obligatorio',
          pattern: { value: /^[0-9()+\-\s]+$/, message: 'Formato inválido' }
        })}
      />
    </Box>
  );
};
