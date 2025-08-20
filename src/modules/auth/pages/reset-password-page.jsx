import { AuthLayout } from '../layout/auth-layout'
import { Box, Button, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../hooks';
import { useMemo } from 'react';
import { CircProgress, FormInputText } from '../../../shared/ui/components';

export const ResetPasswordPage = () => {
  const theme = useTheme();
  const { status, startChangePasswordForgot } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    mode: "onBlur",
  });

  const isAuthenticated = useMemo(() => status === "changing-password", [status]);

  const onSubmit = (data) => {
    startChangePasswordForgot(data);
  };

  return (
    <AuthLayout
      title="Crea una contraseña segura"
      subtitle="La contraseña debe tener entre 6 y 12 caracteres, incluir letras, números y al menos un caracter especial (!$@%)."
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
      >
        {/* Nueva contraseña */}
        <FormInputText
          name="password"
          register={register}
          label="Nueva contraseña"
          type="password"
          error={errors.password}
          rules={{ 
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
            maxLength: { value: 12, message: "Máximo 12 caracteres" },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,12}$/,
              message: "Debe incluir letras, números y al menos un caracter especial (!$@%)"
            }
          }}
        />

        {/* Confirmar nueva contraseña */}
        <FormInputText
          name="confirmPassword"
          register={register}
          label="Confirmar nueva contraseña"
          type="password"
          error={errors.confirmPassword}
          rules={{ 
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
            maxLength: { value: 12, message: "Máximo 12 caracteres" },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$@%])[A-Za-z\d!$@%]{6,12}$/,
              message: "Debe incluir letras, números y al menos un caracter especial (!$@%)"
            }
          }}
        />

        {/* Botón de restablecer contraseña */}
        <Button
          type="submit"
          fullWidth
          variant="text"
          color="primary"
          sx={{
            mt: 4,
            padding: "10px",
            textTransform: "none",
            fontSize: 16,
            "&:hover": {
              backgroundColor: theme.palette.primary.hover,
            },
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          Restablecer Contraseña
        </Button>
      </Box>
    </AuthLayout>
  )
}