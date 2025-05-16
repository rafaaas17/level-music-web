import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.ui.snackbar);

  const handleClose = () => {
    dispatch({ type: 'ui/closeSnackbar' }); 
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};