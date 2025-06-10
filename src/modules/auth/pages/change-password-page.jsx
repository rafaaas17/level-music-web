import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, useTheme, CircularProgress } from "@mui/material";
import { AuthLayout } from "../layout/auth-layout";
import { FormInputText } from "../../../shared/ui/components";
import { useAuthStore } from "../../../hooks";

export const ChangePasswordPage = () => {
  const theme = useTheme();
  const { status, startChangePassword } = useAuthStore();
  
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    mode: "onBlur",
  });

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const onSubmit = async (data) => {
    await startChangePassword(data);
  };

  return (
    <AuthLayout
      title="Cambiar contraseña"
      subtitle="Por seguridad, debes cambiar tu contraseña antes de continuar."
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
            maxLength: { value: 12, message: "Máximo 12 caracteres" }
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
            maxLength: { value: 12, message: "Máximo 12 caracteres" }
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="text"
          color="primary"
          sx={{
            mt: 3,
            padding: "10px",
            textTransform: "none",
            fontSize: 16,
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.primary.hover,
            },
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          Actualizar
        </Button>
      </form>
    </AuthLayout>
  );
};