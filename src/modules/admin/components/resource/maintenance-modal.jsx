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
  const { startCreateMaintenance, startChangeManteinanceStatus } = useMaintenanceStore();

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

  console.log(maintenance)

  useEffect(() => {
    if (open) {
      reset({
        type: maintenance?.type ?? "",
        description: maintenance?.description ?? "",
        resource_id: maintenance?.resource?._id ?? "",
        serialNumber: maintenance?.resource?.serial_number ?? "",
        resourceName: maintenance?.resource?.name ?? "",
        date: maintenance?.date ? dayjs(maintenance.date).format("YYYY-MM-DD") : "",
        status: maintenance?.status ?? "Programado",
      });
    }
  }, [open, reset, maintenance]);

  const handleChange = (field, value) => {
    setValue(field, value);
  };

  const handleSerialChange = async (value) => {
    const formattedValue = value.toUpperCase();
    setValue("serialNumber", formattedValue);
    if (/^[A-Z0-9]{12}$/.test(formattedValue)) {
      const { ok, data } = await startSearchingResource(formattedValue);
      if (ok) {
        setValue("resourceName", data.name);
      } else {
        setValue("resourceName", "");
      }
    } else {
      setValue("resourceName", "");
    }
  };

  const getStatusOptions = (currentStatus) => {
    if (currentStatus === "Programado") {
      return ["En Progreso", "Cancelado"];
    } else if (currentStatus === "En Progreso") {
      return ["Finalizado", "Cancelado"];
    } else {
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      const success = isChangingStatus
        ? await startChangeManteinanceStatus(maintenance._id, data)
        : await startCreateMaintenance(data)
      if (success) {
        setMaintenance(data);
        onClose();
      }
    } catch (error) {
      console.error("Error creating maintenance:", error);
    }
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
          mb={ isChangingStatus ? 3 : 1 }
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
          
          {/* Descripción */}
          <TextField
            label="Descripción"
            fullWidth
            multiline
            minRows={4}
            {...register("description")}
            onChange={(e) => handleChange("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isChangingStatus}
          />

          {/* Numero de serie */}
          <TextField
            label="Número de serie del recurso"
            fullWidth
            {...register("serialNumber")}
            inputProps={{
              maxLength: 12,
              style: { textTransform: "uppercase" },
            }}
            onChange={(e) => handleSerialChange(e.target.value)}
            helperText="12 caracteres alfanuméricos (ej: A1B2C3D4E5F6)"
            error={!!watch("serialNumber") && !/^[A-Z0-9]{12}$/.test(watch("serialNumber"))}
            disabled={isChangingStatus}
          />
         
          {/* Nombre del recurso ingresado */}
          <TextField
            label="Nombre del equipo"
            fullWidth
            value={watch("resourceName") || ""}
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
                slotProps={{ textField: { fullWidth: true } }}
                disabled={isChangingStatus}
              />
            </DemoContainer>
          </LocalizationProvider>

          {/* Estado del mantenimiento */}
          {isChangingStatus && (
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
                renderValue={(selected) => selected ? selected : "Seleccione el nuevo estado"}
              >
                {getStatusOptions(maintenance?.status).map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.status?.message}</FormHelperText>
            </FormControl>
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
