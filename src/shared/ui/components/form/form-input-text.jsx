import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const FormInputText = ({ name, control, label, type = "text", rules = {} }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <TextField
          fullWidth
          margin="normal"
          label={label}
          variant="outlined"
          type={type}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
}; 