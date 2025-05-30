import { Box, Button, IconButton, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useServiceTypeStore } from "../../../../hooks";
import { Close } from "@mui/icons-material";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";

export const ServiceTypeModal = ({ open, onClose, serviceType  = {}, setServiceType, loading }) => {
  const isEditing = !!serviceType?._id;
  const { startCreateServiceType, startUpdateServiceType } = useServiceTypeStore();

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
        name: serviceType?.name ?? "",
        description: serviceType?.description ?? "",
        status: serviceType?.status ?? "Activo",
      });
    }
  }, [open, reset, serviceType]);

  const onSubmit = async (data) => {
    setServiceType(data);
    const success = isEditing
      ? await startUpdateServiceType(serviceType._id, data)
      : await startCreateServiceType(data);
    if (success) onClose();
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: "90%", sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            {isEditing ? 'Editar tipo de servicio' : 'Agregar tipo de servicio'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: 'column' }}>
          {/* Nombre */}
          <TextField
            label="Nombre"
            fullWidth
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Descripción */}
          <TextField
            label="Descripción"
            fullWidth
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* Estado */}
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
            backgroundColor: '#212121',
            color: '#fff',
            textTransform: 'none',
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {isEditing ? 'Guardar cambios' : 'Agregar'}
        </Button>
      </Box>
    </Modal>
  );
};