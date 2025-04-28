import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const FormInputText = ({ name, register, label, type = "text", error, rules = {} }) => {
  return (
    <CustomTextField
      fullWidth
      margin="normal"
      label={label}
      variant="outlined"
      type={type}
      {...register(name, rules)} 
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
};

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired, 
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
};
