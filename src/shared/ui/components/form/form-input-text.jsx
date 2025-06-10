import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.mode === 'dark' ? '#E0E0E0' : theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#E0E0E0' : theme.palette.primary.main,
    },
  },
}));

export const FormInputText = ({ name, register, label, type = "text", error, rules = {}, isPasswordInput = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <CustomTextField
      fullWidth
      margin="normal"
      label={label}
      variant="outlined"
      type={isPasswordInput && showPassword ? "text" : type}
      {...register(name, rules)} 
      error={!!error}
      helperText={error ? error.message : ""}
      InputProps={
        isPasswordInput
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired, 
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  isPasswordInput: PropTypes.bool,
};
