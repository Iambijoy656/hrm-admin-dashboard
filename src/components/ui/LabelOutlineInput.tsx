import { TextField } from '@mui/material';

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
export default function LabelOutlineInput({
  type,
  errors,
  register,
  disabled,
  defaultValue,
  readonly,
  label,
  name,
  fieldID,
  placeholder,
  rules,
}: InputPropsType) {
  return (
    <>
      <TextField
        required
        size="small"
        variant="outlined"
        fullWidth
        autoComplete="on"
        name={name}
        type={type}
        defaultValue={defaultValue}
        label={label}
        id={fieldID}
        placeholder={placeholder}
        error={!!errors}
        helperText={errors ? errors.message : ''}
        sx={{
          '& .MuiFormLabel-root': {
            fontSize: { xs: '.7rem', md: '.8rem' },
            // fontWeight: 500,
          },
          '& label.Mui-focused': {
            // color: "gray",
            fontSize: '.9rem',
          },
          '& .MuiOutlinedInput-root': {
            fontSize: { xs: 12, md: '.8rem' },
            // height: { xs: 35, md: 40 },
            // backgroundColor: "#f1f1f1",
            '&.Mui-focused fieldset': {
              // borderColor: "lightgray",
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              // borderColor: "lightgray",
            },
            '& fieldset span': {
              // fontSize: { xs: 12, md: 10 },
              pr: '6px',
            },
            '&.Mui-focused fieldset span': {
              pr: 2,
            },
          },
        }}
        {...register(name, {
          ...rules,
        })}
      />
    </>
  );
}
