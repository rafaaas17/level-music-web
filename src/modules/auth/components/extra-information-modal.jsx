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
import { useDispatch } from 'react-redux';
import { setExtraData } from '../../../store/auth/auth-slice';


export const ExtraInformationModal = ({ open, onClose }) => {
  const { register, handleSubmit } = useForm();
  const { uid } = useSelector(state => state.auth);
  const { updateUserExtraData } = useUsersStore();
  const dispatch = useDispatch();
  const { extra_data } = useSelector(state => state.auth);
  console.log("Redux",extra_data)
  const onSubmit = async (form_data) => {
    try {
      await updateUserExtraData(uid, {...form_data, extra_data: true}); // Solo actualiza el booleano
      dispatch(setExtraData(true));
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
        height: 600,
        paddingTop: 2,
        padding: 20,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 3,  
      }}>
        <Typography variant="h6">Información Adicional</Typography>
       <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          {...register("first_name", {
          required: "El nombre es obligatorio",
          pattern: {
            value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
            message: "Solo letras y espacios"
          }
        })}
        />
        <TextField
          label="Apellido"
          fullWidth
          margin="normal"
          {...register("last_name", {
          required: "El apellido es obligatorio",
          pattern: {
            value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
            message: "Solo letras y espacios"
          }
        })}
        />
        <TextField
          label="Número de Teléfono"
          fullWidth
          margin="normal"
          {...register("phone", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: "Solo números (7 a 15 dígitos)"
            }
          })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="document-type-label">Tipo Documento</InputLabel>
          <Select
            labelId="document-type-label"
            label="Tipo Documento"
            defaultValue=""
            {...register("document_type")}
          >
            <MenuItem value="dni">DNI</MenuItem>
            <MenuItem value="ce">CE</MenuItem>
            <MenuItem value="passport">Pasaporte</MenuItem>
            <MenuItem value="ruc">RUC</MenuItem>
          </Select>
          <FormHelperText>Selecciona tu tipo de documento</FormHelperText>
        </FormControl>
        <TextField
          label="Numero de documento"
          fullWidth
          margin="normal"
          {...register("document_number", {
            required: "El número de documento es obligatorio",
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: "Solo números (7 a 15 dígitos)"
            }
          })}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Guardar Información
        </Button>
      </Box>
    </Modal>
  )
}
