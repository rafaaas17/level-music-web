import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Alert, Box, Divider, Typography } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/auth-layout";
import { startGoogleSignIn, startFacebookSignIn, startLoginWithEmailPassword } from "../../../store/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onFacebookSignIn = () => {
    dispatch(startFacebookSignIn());
  };

  return (
    <AuthLayout title="Iniciar Sesión">
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

        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            padding: "10px",
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          Ingresar
        </Button>

        {/* Botón de registro */}
        <Button
          fullWidth
          variant="contained"
          onClick={register}
          color="primary"
          sx={{
            mt: 2,
            padding: "10px",
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          Registrarse
        </Button>

        {/* Divider */}
        <Divider sx={{ width: "100%", mt: 2, mb: 1 }} />
        <Typography sx={{ mb: 2 }}>O conéctese por Social Media</Typography>

        {/* Google Login */}
        <Button
          fullWidth
          variant="contained"
          onClick={onGoogleSignIn}
          sx={{
            padding: "10px",
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
            "&:hover": {
              backgroundColor: "#3a66c2",
            },
            backgroundColor: "#5383EC",
            mb: 2,
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          <Google />
          <Typography sx={{ ml: 1 }}>Continuar con Google</Typography>
        </Button>

        {/* Facebook Login */}
        <Button
          fullWidth
          variant="contained"
          onClick={onFacebookSignIn}
          sx={{
            padding: "10px",
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
            backgroundColor: "#4A66AC", 
            "&:hover": {
              backgroundColor: "#3b5998", 
            },
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          <Facebook />
          <Typography sx={{ ml: 1 }}>Continuar con Facebook</Typography>
        </Button>
      </form>
    </AuthLayout>
  );
};
