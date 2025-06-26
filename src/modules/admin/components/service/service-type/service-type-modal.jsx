import React from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import { useServiceTypeStore } from "../../../../../hooks";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ServiceTypeFieldModal } from "./service-type-field-modal";

export const ServiceTypeModal = ({
  open,
  onClose,
  serviceType = {},
  setServiceType,
  loading,
}) => {
  const isEditing = !!serviceType?._id;
  const { startCreateServiceType, startUpdateServiceType } =
    useServiceTypeStore();

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

  const [fieldModalOpen, setFieldModalOpen] = React.useState(false);
  const [selectedField, setSelectedField] = React.useState(null);

  const handleAddField = () => {
    setSelectedField(null);
    setFieldModalOpen(true);
  };

  const handleEditField = (field) => {
    setSelectedField(field);
    setFieldModalOpen(true);
  };

  const handleFieldSubmit = (fieldData) => {
    console.log("Field submitted:", fieldData);
    // Aquí puedes agregar lógica para actualizar el estado de los campos
  };

  const onDeleteField = (fieldName) => {
    console.log("Field deleted:", fieldName);
    // Aquí puedes agregar lógica para eliminar el campo
  };

  return (
    <>
      <ServiceTypeFieldModal
        open={fieldModalOpen}
        onClose={() => setFieldModalOpen(false)}
        onSubmit={handleFieldSubmit}
        field={selectedField}
      />

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
              {isEditing ? "Editar Tipo de Servicio" : "Agregar Tipo de Servicio"}
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
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

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={1}>
            <Typography fontSize={18} fontWeight={500}>
              Estructura de campos
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#212121",
                color: "#fff",
                textTransform: "none",
                py: 1,
                px: 2,
                borderRadius: 2,
                fontWeight: 600,
              }}
              onClick={handleAddField}
            >
              + Agregar campo
            </Button>
          </Box>

          {/* Estructura de campos como cartas */}
          <Box
            sx={{
              maxHeight: 280,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 2,
            }}
          >
            {[].length === 0 ? (
              <Typography textAlign="center" color="text.secondary" fontSize={14} marginY={3}>
                No hay campos disponibles. Agrega un nuevo campo.
              </Typography>
            ) : (
              [].map((field, i) => (
                <Box
                  key={i}
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#494949' : '#C4C4C4'}`,
                    justifyContent: "space-between",
                    display: "flex",
                    borderRadius: 3,
                    gap: 2,
                    p: 2,
                  }}
                >
                  {/* Lado izquierdo: Campo y Tipo de dato */}
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box>
                      <Typography fontWeight={600} fontSize={14}>
                        Campo
                      </Typography>
                      <Typography>{field.name}</Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight={600} fontSize={14}>
                        Tipo de dato
                      </Typography>
                      <Typography>{field.type}</Typography>
                    </Box>
                  </Box>

                  {/* Lado derecho: Acciones y Requerido */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',                  
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton size="small" onClick={() => handleEditField(field)} sx={{ p: 0, m: 0 }}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => onDeleteField(field.name)} sx={{ p: 0, m: 0 }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography fontWeight={600} fontSize={14}>
                        Requerido:
                      </Typography>
                      <Checkbox checked={field.required} disabled size="small" sx={{ p: 0, m: 0 }} />
                    </Box>
                  </Box>
                </Box>
              ))
            )}
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
    </>
  );
};
