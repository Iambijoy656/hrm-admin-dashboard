import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../../../Utilities/api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type VariantType = {
  id: number;
  name_s: string;
  branch_name_s?: string;
  company_name_s?: string;
  variant_value?: string;
};

type DropdownDataType = {
  value: number;
  label: string;
  branch_name: string;
  company_name: string;
};

const SelectComboVariant: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [transformedData, setTransformedData] = useState<DropdownDataType[]>([]);

  const fetchInventoryVariant = async (): Promise<VariantType[]> => {
    try {
      const response = await api.get('/inventory-management/variant/all');
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data.body.data;
    } catch (error) {
      throw new Error('Network response was not ok');
    }
  };

  const { data: variantData = [], isLoading, error } = useQuery<VariantType[], Error>({
    queryKey: ['variantData'],
    queryFn: fetchInventoryVariant,
  });

  // Update transformedData whenever variantData changes
  useEffect(() => {
    if (variantData) {
      const newData = variantData.map((item) => ({
        value: item.id,
        label: item.name_s,
        branch_name: item.branch_name_s || '',
        company_name: item.company_name_s || '',
      }));
      setTransformedData(newData);
    }
  }, [variantData]);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    setSelectedValues(event.target.value as number[]);
  };

  console.log(selectedValues)
  return (
    <Box sx={{ p: { xs: 0, md: 1 }, px: { xs: 0, md: 2 } }}>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel id="demo-multiple-checkbox-label">Select Variant</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label="Select Variant" />}
          renderValue={(selected) =>
            (selected as number[]).map((value) => {
              const variant = transformedData.find((item) => item.value === value);
              return variant ? variant.label : '';
            }).join(', ')
          }
          MenuProps={MenuProps}
        >
          {transformedData.map((variant) => (
            <MenuItem key={variant.value} value={variant.value}>
              <Checkbox checked={selectedValues.indexOf(variant.value) > -1} />
              <ListItemText primary={variant.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComboVariant;
