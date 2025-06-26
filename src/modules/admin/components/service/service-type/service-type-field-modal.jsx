import React from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";

export const ServiceTypeFieldModal = ({
  open,
  onClose,
  onSubmit,
  field = {},
}) => {
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

  React.useEffect(() => {
    if (open) {
      reset({
        name: field?.name ?? "",
        type: field?.type ?? "numérico",
        required: field?.required ?? false,
      });
    }
  }, [open, reset, field]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
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
            {field?.name ? "Editar campo" : "Añadir campo"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre del campo"
            fullWidth
            {...register("name", {
              required: "El nombre del campo es obligatorio",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <FormControl fullWidth>
            <InputLabel id="type-label">Tipo de dato</InputLabel>
            <Select
              labelId="type-label"
              value={watch("type") || "numérico"}
              {...register("type", {
                required: "Selecciona un tipo de dato",
              })}
              onChange={(e) => setValue("type", e.target.value)}
            >
              <MenuItem value="numérico">numérico</MenuItem>
              <MenuItem value="texto corto">texto corto</MenuItem>
              <MenuItem value="texto largo">texto largo</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox {...register("required")} />
            <Typography>Requerido</Typography>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#212121",
            color: "#fff",
            textTransform: "none",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};