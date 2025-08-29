import React from 'react';
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
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useUsersStore } from '../../../hooks/user/use-users-store';


export const ExtraInformationModal = ({ open, onClose }) => {
  const { register, handleSubmit } = useForm();
  const { uid } = useSelector(state => state.auth);
  const { updateUserExtraData } = useUsersStore();

  const onSubmit = async (data) => {
    try {
      await updateUserExtraData(uid, true); // Solo actualiza el booleano
      if (onClose) onClose();
    } catch (error) {
      console.log("Error agregando data extra:", error);
    }
  };

  return (
    <Modal 
    open={open} 
    onClose={onClose} 
    hideBackdrop={false} 
    disableEscapeKeyDown
   >
      <Box
       component="form"
        onSubmit={handleSubmit(onSubmit)}
      sx={{

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 500,
        paddingTop: 2,
        padding: 20,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 3,  
      }}>
        <Typography variant="h6">Información Adicional</Typography>
       <TextField
          label="Nombre Completo"
          fullWidth
          margin="normal"
          {...register("fullName")}
        />
        <TextField
          label="Número de Teléfono"
          fullWidth
          margin="normal"
          {...register("phoneNumber")}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            label="Rol"
            defaultValue=""
            {...register("role")}
          >
            <MenuItem value="student">Estudiante</MenuItem>
            <MenuItem value="teacher">Profesor</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </Select>
          <FormHelperText>Selecciona tu rol en la plataforma</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Guardar Información
        </Button>
      </Box>
    </Modal>
  )
}
