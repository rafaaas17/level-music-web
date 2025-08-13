import { useForm } from "react-hook-form";
import { AuthLayout } from "../layout/auth-layout";
import { FormInputText } from "../../../shared/ui/components";
import { Typography, Button, Link, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useAuthStore } from "../../../hooks";

export const ForgotPasswordPage = () => {
  const theme = useTheme();
  const { status, startPasswordReset } = useAuthStore();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    mode: "onBlur",
  });
  const isAuthenticated = useMemo(() => status === "checking", [status]);
  const onSubmit = (data) => {
    startPasswordReset(data);
  };
  return (
    <AuthLayout
      title="Restablecer contraseña"
      subtitle="Ingresa tu correo para enviarte un enlace de recuperación."
      isLogin
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        {/* Email */}
        <FormInputText
          name="email"
          register={register}
          label="Email"
          type="email"
          error={errors.email}
          rules={{
            required: "El email es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          }}
        />
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
          Ingresar
        </Button>

        <Typography sx={{ my: 3, fontSize: 16 }}>
          ¿Aún no tienes una cuenta?{" "}
          <Link
            to="/auth/register"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "underline",
              fontWeight: 600,
            }}
          >
            Crear Cuenta
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};
