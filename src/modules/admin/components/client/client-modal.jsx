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
import { useClientStore } from "../../../../hooks";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useMemo, useEffect } from "react";

export const ClientModal = ({
  open,
  onClose,
  client = {},
  setClient,
  loading,
}) => {
  const isEditing = !!client?._id;
  const { startCreateClient, startUpdateClient } = useClientStore();

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
        name: client?.name ?? "",
        lastname: client?.lastname ?? "",
        email: client?.email ?? "",
        phone: client?.phone ?? "",
        status: client?.status ?? "Activo",
      });
    }
  }, [open, reset, client]);

  const onSubmit = async (data) => {
    setClient(data);
    const success = isEditing
      ? await startUpdateClient(client._id, data)
      : await startCreateClient(data);
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
            {isEditing ? "Editar cliente" : "Agregar cliente"}
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
            label="Apellido"
            fullWidth
            {...register("lastname", {
              required: "El apellido es obligatorio",
            })}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
          />
          <TextField
            label="Correo"
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
          <TextField
            label="Teléfono"
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