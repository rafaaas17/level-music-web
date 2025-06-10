import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Typography, IconButton, InputAdornment, Box } from "@mui/material";
import { AuthLayout } from "../layout/auth-layout";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const ChangePasswordPage = ({ onPasswordChange }) => {
  const { email } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }
    try {
      await onPasswordChange(password);
    } catch (err) {
      setError("Error al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Cambiar contraseña"
      subtitle="Por seguridad, debes cambiar tu contraseña antes de continuar."
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          name="password"
          label="Nueva contraseña"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, background: password ? '#eaf2ff' : 'white' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          name="confirmPassword"
          label="Confirmar nueva contraseña"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2, background: confirmPassword ? '#eaf2ff' : 'white' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {error && (
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography color="error" sx={{ width: "100%" }}>
              {error}
            </Typography>
          </Box>
        )}
        <Button
          type="submit"
          fullWidth
          variant="text"
          color="primary"
          sx={{
            mt: 1,
            padding: "10px",
            textTransform: "none",
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.hover',
            },
          }}
          disabled={loading}
        >
          Actualizar
        </Button>
      </form>
    </AuthLayout>
  );
};