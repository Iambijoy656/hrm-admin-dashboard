import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { HiOutlineMinusSm, HiPlus } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import api from '../../../Utilities/api';
import VariantImage from './VariantImage';

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
  variant_id?: number;
};

const SelectComboVariant: React.FC = () => {
  const [selectedVariantForVariant, setSelectedVariantForVariant] = useState<
    VariantType[]
  >([]);
  const [rowImage, setRowImage] = useState({});
  const [isOpen, setIsOpen] = useState(0);
  const [transformedData, setTransformedData] = useState<DropdownDataType[]>(
    [],
  );
  const [photos, setPhotos] = useState([]);
  const [componentRender, setComponentRender] = useState(false);
  const [allDataForVariantValueDropdown, setAllDataForVariantValueDropdown] =
    useState<DropdownDataType[]>([]);
    const [checkDiff, setCheckDiff] = useState(false);
  const [
    formatAllDataForVariantValueDropdown,
    setFormatAllDataForVariantValueDropdown,
  ] = useState<{ [key: number]: DropdownDataType[] }>({});

  const [addRowInVariant, setAddRowInVariant] = useState([0]);

  const addNewRow = () => {
    if (selectedVariantForVariant?.length > 0) {
      const preLength = addRowInVariant.length;
      setAddRowInVariant((prev) => [...prev, preLength]);
      setComponentRender(!componentRender);
    }
  };

  const removeItemFromVariantList = (id) => {
    if (addRowInVariant?.includes(id)) {
      // const remainingID =  addRowInVariant.splice(addRowInVariant.indexOf(id), 1);
      const updatedRows = addRowInVariant.filter((itemId) => itemId !== id);
      setAddRowInVariant(updatedRows);
      setComponentRender(!componentRender);
    }
  };

  const fetchInventoryVariant = async (): Promise<VariantType[]> => {
    const response = await api.get('/inventory-management/variant/all');
    return response.data.body.data;
  };

  const {
    data: variantData = [],
    isLoading,
    error,
  } = useQuery<VariantType[], Error>({
    queryKey: ['variantData'],
    queryFn: fetchInventoryVariant,
  });

  useEffect(() => {
    if (variantData.length > 0) {
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
    const value = event.target.value as number[];
    const selectedVariants = variantData.filter((variant) =>
      value.includes(variant.id),
    );
    setSelectedVariantForVariant(selectedVariants);
  };

  const isSelected = (id: number) =>
    selectedVariantForVariant.some((item) => item.id === id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/inventory-management/variant/value`);
      const data = response.data.body.data.map(
        (item: {
          id: any;
          value: any;
          variant_id: any;
          variant_name: any;
        }) => ({
          value: item.id,
          label: item.value,
          variant_id: item.variant_id,
          variant_name: item.variant_name,
        }),
      );
      setAllDataForVariantValueDropdown(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const formatData = () => {
      const newFormatData: { [key: number]: DropdownDataType[] } = {};
      transformedData.forEach((singleData) => {
        const filterData = allDataForVariantValueDropdown.filter(
          (item) => singleData.value === item.variant_id,
        );
        newFormatData[singleData.value] = filterData;
      });
      setFormatAllDataForVariantValueDropdown(newFormatData);
    };
    formatData();
  }, [allDataForVariantValueDropdown, transformedData]);


  






  console.log('allDataForVariantValueDropdown', allDataForVariantValueDropdown);
  console.log(
    'formatAllDataForVariantValueDropdown',
    formatAllDataForVariantValueDropdown,
  );
  console.log('selectedVariantForVariant', selectedVariantForVariant);

  return (
    <Box sx={{ p: { xs: 0, md: 1 }, px: { xs: 0, md: 2 } }}>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel id="demo-multiple-checkbox-label">
          Select Variant
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedVariantForVariant.map((item) => item.id)}
          onChange={handleChange}
          input={<OutlinedInput label="Select Variant" />}
          renderValue={(selected) =>
            (selected as number[])
              .map((value) => {
                const variant = transformedData.find(
                  (item) => item.value === value,
                );
                return variant ? variant.label : '';
              })
              .join(', ')
          }
          MenuProps={MenuProps}
        >
          {transformedData.map((variant) => (
            <MenuItem key={variant.value} value={variant.value}>
              <Checkbox checked={isSelected(variant.value)} />
              <ListItemText primary={variant.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box className="mt-4">
        {selectedVariantForVariant?.length > 0 ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: '100%',
              }}
            >
              {selectedVariantForVariant?.map((singleVariantData, index) => (
                <Box key={index} sx={{ width: '100%' }}>
                  {/* <p className="text-sm font-bold">
                    {singleVariantData?.name_s}
                  </p> */}

                  <Autocomplete
                    size="small"
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={[
                      { label: 'The Godfather', id: 1 },
                      { label: 'Pulp Fiction', id: 2 },
                    ]}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          '& .MuiFormLabel-root': {
                            fontSize: { xs: '.7rem', md: '.9rem' },
                            // fontWeight: 500,
                          },
                        }}
                        {...params}
                        label={singleVariantData?.name_s}
                      />
                    )}
                  />
                </Box>
              ))}
              <Box sx={{ width: '100%' }}>
                {/* <p className="text-sm font-bold">SKU</p> */}
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <TextField
                    sx={{
                      '& .MuiFormLabel-root': {
                        fontSize: { xs: '.7rem', md: '.9rem' },
                        // fontWeight: 500,
                      },
                    }}
                    size="small"
                    fullWidth
                    label="SKU"
                    id="fullWidth"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '100%' }}>
                {/* <p className="text-sm font-bold">Added Cost</p> */}
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <TextField
                    sx={{
                      '& .MuiFormLabel-root': {
                        fontSize: { xs: '.7rem', md: '.9rem' },
                        // fontWeight: 500,
                      },
                    }}
                    size="small"
                    fullWidth
                    label="Added Cost"
                    id="fullWidth"
                  />
                </Box>
              </Box>

              <Box>
                {/* <p className="text-sm font-bold">Action</p> */}
                <div className="flex items-center gap-2">
                  <div
                  // onClick={() => toggle(singleRowData)}
                  >
                    {isOpen !== 0 ? (
                      <HiPlus className="dark:bg-[#1e1e1e]"></HiPlus>
                    ) : (
                      <HiOutlineMinusSm className="dark:bg-[#1e1e1e]"></HiOutlineMinusSm>
                    )}
                  </div>

                  <div
                    // onClick={() => removeItemFromVariantList(singleRowData)}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <RxCross2 className="dark:bg-[#1e1e1e]" />
                  </div>
                </div>
              </Box>
            </Box>

            <Box>
              <VariantImage
                rowImage={rowImage}
                setRowImage={setRowImage}
                handelUploadData={(e) =>
                  // handleImageChangeFN(e, singleRowData, `sku_images`)
                }
                // singleRowData={singleRowData}
                photos={photos}
                // setPhotos={setPhotos}
              />
            </Box>

            <Box className="flex justify-end">
              <button
                // onClick={() => addNewRow()}
                className="btn btn-outline-primary btn-xs  mt-5"
                type="button"
              >
                Add new item
              </button>
            </Box>
          </>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};

export default SelectComboVariant;
