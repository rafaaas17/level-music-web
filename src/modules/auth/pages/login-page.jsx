import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Button, Alert, Box, Typography, useTheme } from "@mui/material";
import { AuthLayout } from "../layout/auth-layout";
import { useAuthStore } from "../../../hooks/use-auth-store";
import googleLogo from "../../../assets/images/logo/google.png";
import { clearErrorMessage } from "../../../store/auth";
import { CircProgress } from "../../../shared/ui/components/common";

export const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status, errorMessage, startLogin, onGoogleSignIn } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur"
  });

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  const onSubmit = async (data) => {
    const success = await startLogin(data);
    if (success) navigate('/');
  };

  return (
    <AuthLayout 
      title="Bienvenido al mundo de los eventos inolvidables." 
      subtitle="Inicia sesión y descubre experiencias únicas."
      isLogin
    >
      {status === 'checking' && <CircProgress />}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        {/* Email */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          {...register("email", { required: "El email es obligatorio" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Contraseña */}
        <TextField
          fullWidth
          margin="normal"
          label="Contraseña"
          type="password"
          variant="outlined"
          {...register("password", { required: "La contraseña es obligatoria" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* Mensaje de error */}
        {errorMessage && (
          <Box sx={{ mt: 2, mb: 1 }}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
          <Link 
            to="/forgot-password" 
            style={{ 
              color: theme.palette.text.primary, 
              textDecoration: "underline" 
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link> 
        </Box>

        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          fullWidth
          variant="text"
          color="primary"
          sx={{
            mt: 2,
            padding: "10px",
            textTransform: "none",
            fontSize: "1rem",
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

        <Typography sx={{ my: 5 }}>
          ¿Aún no tienes una cuenta?{' '}
          <Link 
            to="/auth/register" 
            style={{ 
              color: theme.palette.text.primary, 
              textDecoration: "underline", 
              fontWeight: 600 
            }}
          >
            Crear Cuenta
          </Link>
        </Typography>

        {/* Google Login */}
        <Button
          fullWidth
          variant="text"
          onClick={onGoogleSignIn}
          sx={{
            padding: "10px",
            textTransform: "none",
            fontSize: "1rem",
            color: "#000",
            "&:hover": {
              backgroundColor: "#D3B7AD",
            },
            backgroundColor: "#F0D1C5",
            mb: 2,
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          <Box
            component="img"
            src={googleLogo}
            alt="Google Logo"
            sx={{
              width: 24,
              height: 24,
              mr: 1
            }}
          />
          <Typography sx={{ ml: 1 }}>Continuar con Gmail</Typography>
        </Button>
      </form>
    </AuthLayout>
  );
};
