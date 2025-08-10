import React, { useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";

export const EventTypeFieldModal = ({
  open,
  onClose,
  onSubmit,
  field = {},
  index = null,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: field?.name ?? "",
        description: field?.description ?? "",
      });
    }
  }, [open, reset, field]);

  const handleFormSubmit = (data) => {
    onSubmit(data, index);
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            {field?.name ? "Editar tarea" : "Añadir tarea"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre de la tarea"
            fullWidth
            {...register("name", { required: "El nombre del campo es obligatorio" })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            {...register("description", { required: "La descripción de la tarea es obligatoria" })}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
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
