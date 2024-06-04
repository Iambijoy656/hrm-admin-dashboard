import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { Options } from '../../types/Modals';

type SearchInputProps = {
  options: Options[];
  name: string;
  errors: any;
  placeholder: string;
  defaultValue: string;
  label: string;
  disabled: boolean;
  readOnly: boolean;
  rules: any;
  register: any;
};

export default function NativeSelect({
  label,
  name,
  errors,
  options,
  placeholder,
  defaultValue,
  disabled,
  readOnly,
  rules,
  register,
}: SearchInputProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent<any>) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth size="small">
        <InputLabel
          sx={{ fontSize: { xs: '.7rem', md: '.8rem' } }}
          id="demo-simple-select-label"
        >
          {label}
        </InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          error={!!errors}
          onChange={(e) => {
            handleChange(e);
          }}
          sx={{
            '& .MuiSelect-select': {
              fontSize: { xs: '.7rem', md: '.7rem' },
              paddingTop: '6px',
              paddingBottom: '6px',
            },
            minHeight: '32px', // Adjust this value to set the minimum height if needed
          }}
          {...register(name, {
            ...rules,
            onChange: (e: SelectChangeEvent<any>) => handleChange(e), // Registering the change handler
          })}
        >
          {options.map((option, index) => (
            <MenuItem
              sx={{ fontSize: 12, minHeight: 'auto', padding: '6px 12px' }}
              key={index}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

