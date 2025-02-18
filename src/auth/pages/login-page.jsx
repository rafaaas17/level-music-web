import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogin } from "../../store/auth";
import { TextField, Button, Alert, Box, Grid, Divider, Typography } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/auth-layout";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(startLogin({ ...data, navigate }));
  };
  
  const onGoogleSignIn = () => {
    // dispatch(startGoogleSignIn());
  };

  const onFacebookSignIn = () => {
    // dispatch(startFacebookSignIn());
  };

  return (
    <AuthLayout title="Iniciar Sesión">
      <form 
        onSubmit={handleSubmit((data, event) => onSubmit(data, event))} 
        style={{ width: "100%" }}
      >
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

        {/* Validaciones */}
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
            mt: 2 ,
            textTransform: "none",
            fontSize: "1rem",
            color: "white"
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          Ingresar
        </Button>

        {/* Botón de registro */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ 
            mt: 2,
            textTransform: "none",
            fontSize: "1rem",
            color: "white"
          }}
          disabled={isSubmitting || isAuthenticated}
        >
          Registrarse
        </Button>

        {/* Divider */}
        <Divider sx={{ color: "social_media.divider", width: "100%", mt: 2, mb: 1 }} />
        <Typography sx={{ color: "social_media.text", mb: 2 }}>O conéctese por Social Media</Typography>

        {/* Google Login */}
        <Button
          disabled={isAuthenticated}
          variant="contained"
          fullWidth
          onClick={onGoogleSignIn}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
            backgroundColor: "#5383EC",
            padding: "10px",
            mb: 2
          }}
        >
          <Google />
          <Typography sx={{ ml: 1 }}>Continuar con Google</Typography>
        </Button>

        {/* Facebook Login */}
        <Button
          disabled={isAuthenticated}
          variant="contained"
          fullWidth
          onClick={onFacebookSignIn}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            color: "white",
            backgroundColor: "#4A66AC",
            padding: "10px"
          }}
        >
          <Facebook />
          <Typography sx={{ ml: 1 }}>Continuar con Facebook</Typography>
        </Button>
      </form>
    </AuthLayout>
  );
};
