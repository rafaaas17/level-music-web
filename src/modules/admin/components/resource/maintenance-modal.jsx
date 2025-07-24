import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useMemo } from "react";
import { useMaintenanceStore, useResourceStore } from "../../../../hooks";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { formatDay } from "../../../../shared/utils";
import dayjs from "dayjs";

export const MaintenanceModal = ({ 
  open,
  onClose,
  maintenance = {},
  setMaintenance,
  loading,
}) => {
  const isChangingStatus = !!maintenance?._id; 
  const { startSearchingResource } = useResourceStore();
  const { startCreateMaintenance, startChangeMaintenanceStatus } = useMaintenanceStore();

  const {
    register,
    unregister,
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
        type: "Correctivo",
        resourceName: maintenance.resource_name ?? "",
        description: maintenance.description ?? "",
      });
    }
    if (isChangingStatus) {
      unregister('serialNumber');
      unregister('date');
    }
  }, [open, isChangingStatus, maintenance, reset, unregister]);

  const handleSerialChange = async (value) => {
    const formattedValue = value.toUpperCase();
    setValue("serialNumber", formattedValue);
    if (/^[A-Z0-9]{12}$/.test(formattedValue)) {
      const { ok, data } = await startSearchingResource(formattedValue);
      if (ok) {
        setValue("resource_id", data._id);
        setValue("resourceName", data.name);
        setValue("resourceType", data.resource_type);
      } else {
        setValue("resource_id", "");
        setValue("resourceName", "");
        setValue("resourceType", "");
      }
    } else {
      setValue("resource_id", "");
      setValue("resourceName", "");
      setValue("resourceType", "");
    }
  };

  const getStatusOptions = (current) => {
    if (current === 'Programado') return ['En Progreso', 'Cancelado'];
    if (current === 'En Progreso') return ['Finalizado', 'Cancelado'];
    return [];
  };

  const onSubmit = async (data) => {
    try {
      const success = isChangingStatus
        ? await startChangeMaintenanceStatus(maintenance._id, data)
        : await startCreateMaintenance(data)
      if (success) {
        setMaintenance(data);
        onClose();
      }
    } catch (error) {
      console.log("Error creating maintenance:", error);
    }
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        key={open ? "mounted" : "unmounted"}
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
          mb={ isChangingStatus ? 2 : 1 }
        >
          <Typography variant="h6" fontWeight={600}>
            {isChangingStatus ? "Cambiar estado de mantenimiento" : "Registrar mantenimiento"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {!isChangingStatus &&
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography sx={{ fontWeight: 300, fontSize: 16 }}>
              Los mantenimientos registrados en el sistema son exclusivamente de tipo{" "}
              <span style={{ fontWeight: 600 }}>Correctivo</span>.
            </Typography>
          </Box>
        }

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
          {!isChangingStatus && (
            <>
              {/* Descripción */}
              <TextField
                label="Descripción"
                fullWidth
                multiline
                minRows={4}
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
                disabled={isChangingStatus}
              />

              {/* Numero de serie */}
              <TextField
                label="Número de serie del recurso"
                fullWidth
                {...register("serialNumber", {
                  required: "El número de serie es obligatorio",
                })}
                inputProps={{
                  maxLength: 12,
                  style: { textTransform: "uppercase" },
                }}
                onChange={(e) => handleSerialChange(e.target.value)}
                helperText={ errors.serialNumber?.message ?? "Debe tener 12 caracteres alfanuméricos en mayúsculas." }
                error={!!errors.serialNumber || (!!watch("serialNumber") && watch("serialNumber") !== "" && !/^[A-Z0-9]{12}$/.test(watch("serialNumber")))}
                disabled={isChangingStatus}
              />
            
              {/* Nombre del recurso ingresado */}
              <TextField
                label="Nombre del Recurso"
                fullWidth
                value={watch("resourceName") || ""}
                InputProps={{
                  readOnly: true,
                  style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
                }}
                disabled
              />

              {/* Tipo del recurso ingresado */}
              <TextField
                label="Tipo del Recurso"
                fullWidth
                value={watch("resourceType") || ""}
                InputProps={{
                  readOnly: true,
                  style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
                }}
                disabled
              />
              
              {/* Fecha del mantenimiento */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Fecha del mantenimiento"
                    value={watch("date") ? dayjs(watch("date")) : null}
                    onChange={(date) => setValue("date", date ? date.format("YYYY-MM-DD") : "")}
                    disabled={isChangingStatus}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        ...register("date", {
                          required: "La fecha es obligatoria"
                        }),
                        error: !!errors.date,
                        helperText: errors.date?.message ?? "",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </>
          )}

          {/* Estado del mantenimiento */}
          {isChangingStatus && (
            <>
              <Box mb={1}>
                <Typography mb={1} variant="body2"><strong>Descripción:</strong> {maintenance.description}</Typography>
                <Typography mb={1} variant="body2"><strong>Fecha:</strong> {formatDay(maintenance.date)}</Typography>
                <Typography mb={1} variant="body2"><strong>Recurso:</strong> {maintenance.resource_name}</Typography>
              </Box>
              <Box>
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel id="status-label">Estado del mantenimiento</InputLabel>
                  <Select
                    labelId="status-label"
                    value={watch("status") || ""}
                    displayEmpty
                    {...register("status", {
                      required: "Selecciona un estado de mantenimiento",
                    })}
                    onChange={(e) => setValue("status", e.target.value)}
                    renderValue={(selected) => selected}
                  >
                    {getStatusOptions(maintenance?.status).map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.status?.message}</FormHelperText>
                </FormControl>
              </Box>
            </>
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
          { isChangingStatus ? "Cambiar estado" : "Registrar mantenimiento" }
        </Button>
      </Box>
    </Modal>
  );
};
