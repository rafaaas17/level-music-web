import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useProviderStore } from "../../../../hooks";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useMemo, useEffect } from "react";

export const ProviderModal = ({
  open,
  onClose,
  provider = {},
  setProvider,
  loading,
}) => {
  const isEditing = !!provider?._id;
  const { startCreateProvider, startUpdateProvider } = useProviderStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (open) {
      reset({
        name: provider?.name ?? "",
        contact_name: provider?.contact_name ?? "",
        phone: provider?.phone ?? "",
        email: provider?.email ?? "",
        status: provider?.status ?? "Activo",
      });
    }
  }, [open, reset, provider]);

  const onSubmit = async (data) => {
    setProvider(data);
    const success = isEditing
      ? await startUpdateProvider(provider._id, data)
      : await startCreateProvider(data);
    if (success) onClose();
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
            {isEditing ? "Editar proveedor" : "Agregar proveedor"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
          <TextField
            label="Nombre"
            fullWidth
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Nombre de contacto"
            fullWidth
            {...register("contact_name", {
              required: "El nombre de contacto es obligatorio",
            })}
            error={!!errors.contact_name}
            helperText={errors.contact_name?.message}
          />
          <TextField
            label="Numero"
            fullWidth
            {...register("phone", {
              required: "El número es obligatorio",
              pattern: {
                value: /^[0-9]{9}$/,
                message: "El número debe tener 9 dígitos",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            label="Email"
            fullWidth
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Correo electrónico inválido",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl fullWidth error={!!errors.status}>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              value={watch("status") || "Activo"}
              {...register("status", {
                required: "Selecciona un estado",
              })}
              onChange={(e) => setValue("status", e.target.value)}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isButtonDisabled}
          sx={{
            mt: 1,
            backgroundColor: "#212121",
            color: "#fff",
            textTransform: "none",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {isEditing ? "Guardar cambios" : "Agregar"}
        </Button>
      </Box>
    </Modal>
  );
};
