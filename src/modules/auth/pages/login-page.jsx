import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Alert, Box, Divider, Typography, useTheme } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/auth-layout";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../store/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  // Estado de autenticación
  const { 
    status, 
    errorMessage 
  } = useSelector((state) => state.auth);
  
  // Hook de formulario
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const onSubmit = (data) => {
    dispatch(startLoginWithEmailPassword({ ...data }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout 
      title="Bienvenido al mundo de los eventos inolvidables." 
      subtitle="Inicia sesión y descubre experiencias únicas."
    >
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
          ¿Aún no tienes una cuenta?  <Link to="/register" style={{ color: theme.palette.text.primary, textDecoration: "underline", fontWeight: 600 }}>Crear Cuenta</Link>
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
            src="/src/assets/images/logo/google.png"
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
