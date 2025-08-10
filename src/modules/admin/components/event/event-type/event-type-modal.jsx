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
} from "@mui/material";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useEventTypeStore } from "../../../../../hooks";
import { useMemo, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { EventTypeFieldModal } from "./event-type-field-modal";

export const EventTypeModal = ({
  open,
  onClose,
  eventType = {},
  setEventType,
  loading,
}) => {
  const isEditing = !!eventType?._id;
  const { startCreateEventType, startUpdateEventType } = useEventTypeStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      type: "",
      description: "",
      category: "",
      status: "Activo",
      attributes: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "attributes",
  });

  useEffect(() => {
    if (open) {
      reset({
        type: eventType?.type ?? "",
        description: eventType?.description ?? "",
        category: eventType?.category ?? "",
        status: eventType?.status ?? "Activo",
        attributes: eventType?.attributes ?? [],
      });
    }
  }, [open, reset, eventType]);

  const onSubmit = async (data) => {
    try {
      const success = isEditing
        ? await startUpdateEventType(eventType._id, data)
        : await startCreateEventType(data);
      if (success) {
        setEventType(data);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddField = () => {
    setSelectedField(null);
    setEditingIndex(null);
    setFieldModalOpen(true);
  };

  const handleEditField = (field, index) => {
    setSelectedField(field);
    setEditingIndex(index);
    setFieldModalOpen(true);
  };

  const handleFieldSubmit = (fieldData, index = null) => {
    if (index !== null) {
      update(index, fieldData);
    } else {
      append(fieldData);
    }
    setFieldModalOpen(false);
  };

  return (
    <>
      <EventTypeFieldModal
        open={fieldModalOpen}
        onClose={() => setFieldModalOpen(false)}
        onSubmit={handleFieldSubmit}
        field={selectedField}
        index={editingIndex}
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
              {isEditing ? "Editar evento" : "Agregar evento"}
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
              value={eventType?.type || ""}
              onChange={(e) =>
                setEventType({ ...eventType, type: e.target.value })
              }
            />

            {/* Descripcion */}
            <TextField
              label="Descripción"
              fullWidth
              value={eventType?.description || ""}
              onChange={(e) =>
                setEventType({ ...eventType, description: e.target.value })
              }
            />

            {/* Categoria */}
            <FormControl fullWidth>
              <InputLabel id="category-label">Categoria</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={eventType?.category || "Social"}
                onChange={(e) =>
                  setEventType({ ...eventType, category: e.target.value })
                }
              >
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Corporativo">Corporativo</MenuItem>
              </Select>
            </FormControl>

            {/* Estado */}
            <FormControl fullWidth>
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={eventType?.status || "Activo"}
                onChange={(e) =>
                  setEventType({ ...eventType, status: e.target.value })
                }
              >
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Sección de atributos */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            mt={1}
          >
            <Typography fontSize={18} fontWeight={500}>
              Estructura de campos
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddField}
              disabled={isButtonDisabled}
              sx={{
                backgroundColor: "#212121",
                color: "#fff",
                textTransform: "none",
                py: 1,
                px: 2,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              + Agregar tarea
            </Button>
          </Box>

          {/* Lista de atributos */}
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
            {fields.length === 0 ? (
              <Typography
                textAlign="center"
                color="text.secondary"
                fontSize={14}
                my={3}
              >
                No hay campos disponibles. Agrega un nuevo campo.
              </Typography>
            ) : (
              fields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{
                    border: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark" ? "#494949" : "#C4C4C4"
                      }`,
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography fontWeight={600} fontSize={14}>
                      Tarea
                    </Typography>
                    <Typography>{field.name}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box display="flex" gap={1} justifyContent="flex-end">
                      <IconButton
                        onClick={() => handleEditField(field, index)}
                        size="small"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => remove(index)} size="small">
                        <Delete fontSize="small" />
                      </IconButton>
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
