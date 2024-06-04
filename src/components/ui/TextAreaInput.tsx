import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type InputPropsType = {
  errors: any;
  defaultValue: string | number;
  disabled: boolean;
  readonly: boolean;
  label: string;
  name: string;
  register: any;
  type: string;
  placeholder: string;
  fieldID: string;
  rules: any;
};

export default function TextAreaInput({
  type,
  errors,
  register,
  disabled,
  defaultValue = '',
  readonly,
  label,
  name,
  fieldID,
  placeholder,
  rules,
}: InputPropsType) {
  return (
    <TextField
      sx={{
        '& .MuiInputBase-root': { fontSize: { xs: '.7rem', md: '.8rem' } },
        '& .MuiInputLabel-root': { fontSize: { xs: '.7rem', md: '.8rem' } },
      }}
      required
      size="small"
      variant="outlined"
      fullWidth
      autoComplete="on"
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      error={!!errors}
      helperText={errors ? errors.message : ''}
      id={fieldID}
      multiline
      rows={4}
      defaultValue={defaultValue}
      disabled={disabled}
      InputProps={{ readOnly: readonly }}
      {...register(name, rules)}
    />
  );
}
