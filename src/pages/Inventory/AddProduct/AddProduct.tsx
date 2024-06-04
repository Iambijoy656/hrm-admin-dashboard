import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaCirclePlus } from 'react-icons/fa6';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddUnitTypeModal from '../../../components/Modal/UnitType/AddUnitTypeModal';
import ProductImage from '../../../components/ProductImage/ProductImage';
import LabelOutlineInput from '../../../components/ui/LabelOutlineInput';
import NativeSelect from '../../../components/ui/NativeSelect';
import { ThemeContext } from '../../../context/ThemeProvider';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Inputs, Options, Photo } from '../../../types/Modals';
import api from '../../../Utilities/api';

const AddProduct = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpenAddUnitType = () => setModalOpen(true);
  const handleCloseAddUnitType = () => setModalOpen(false);
  const { mode } = useContext(ThemeContext);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasSerial, setHasSerial] = useState(0);
  const [hasBatch, setHasBatch] = useState(0);
  const [hasExpired, setHasExpired] = useState(0);
  const [disableEcommerce, setDisableEcommerce] = useState(0);
  const [stockOutSell, setStockOutSell] = useState(0);
  const [warrantyType, setWarrantyType] = useState(0);
  const [allUnitType, setAllUnitType] = useState<Options[]>([]);
  const [isUnitTypeChange, setIsUnitTypeChange] = useState(false);
  const [unitType, setUnitType] = useState({});

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const productTypesOptions: Options[] = [
    { value: 'Single', label: 'Standard' },
    { value: 'Combo', label: 'Combo' },
    { value: 'Service', label: 'Service' },
  ];

  const handleChangeForUpdateUnitType = (selected: any) => {
    setUnitType(selected);
  };

  const isUnitTypeDirty = () => {
    setIsUnitTypeChange(!isUnitTypeChange);
  };

  // useEffect(() => {
  //   const getDataFn = async () => {
  //     setAllUnitType([]);
  //     const getData = await getInventoryUnitType();
  //     getData?.data?.body?.data?.map((item) => {
  //       const set_data= {
  //         value: item.id,
  //         label: item.unit_type_s,
  //       };
  //       setAllUnitType((prevUnit) => [...prevUnit, set_data]);
  //     });
  //   };
  //   getDataFn();
  // }, [isUnitTypeChange]);

  // useEffect(() => {
  //   setUnitType(allUnitType?.[0]);
  // }, [allUnitType]);

  useEffect(() => {
    const getDataFn = async () => {
      setAllUnitType([]);
      const getData = await api.get(`/inventory-management/unit-type/all`);
      const newData = getData?.data?.body?.data?.map((item: any) => ({
        value: item.id,
        label: item.unit_type_s,
      })) as Options[];

      setAllUnitType(newData);
      setUnitType(newData?.[0]);
    };

    getDataFn();
  }, [isUnitTypeChange]);

  return (
    <DefaultLayout>
      <Breadcrumb Parent="Inventory" pageName="Add Product" />
      <ThemeProvider theme={createTheme({ palette: { mode: mode } })}>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component={'form'}
          className="my-16 flex items-start gap-3"
        >
          <Box
            sx={{
              width: '70%',
              display: 'flex',
              // alignItems: 'center',
              gap: 1.5,
              flexDirection: { xs: 'column' },
            }}
          >
            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <LabelOutlineInput
                  disabled={false}
                  readonly={false}
                  name="name"
                  label={'Product Name'}
                  fieldID={'name'}
                  defaultValue={''}
                  register={register}
                  type="text"
                  errors={errors?.name}
                  placeholder={'Product Name'}
                  rules={{
                    required: 'Product Name is required',
                    // pattern: {
                    //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    //   message: 'Invalid email input',
                    // },
                  }}
                />
                <LabelOutlineInput
                  disabled={false}
                  readonly={false}
                  name="sku"
                  label={'SKU'}
                  fieldID={'sku'}
                  defaultValue={''}
                  register={register}
                  type="text"
                  errors={errors?.sku}
                  placeholder={'SKU'}
                  rules={{
                    required: 'SKU is required',
                    // pattern: {
                    //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    //   message: 'Invalid email input',
                    // },
                  }}
                />
                <LabelOutlineInput
                  disabled={false}
                  readonly={false}
                  name="hsn"
                  label={'HSN'}
                  fieldID={'hsn'}
                  defaultValue={''}
                  register={register}
                  type="text"
                  errors={errors?.hsn}
                  placeholder={'Hsn'}
                  rules={{
                    required: 'HSN is required',
                    // pattern: {
                    //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    //   message: 'Invalid email input',
                    // },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Button
                    endIcon={<FaCirclePlus size={14} />}
                    component="label"
                    onClick={handleOpenAddUnitType}
                    sx={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      width: 'fit-content',
                      textTransform: 'capitalize',
                      color: '#3572EF',
                    }}
                  >
                    New Unit
                  </Button>
                  <NativeSelect
                  name="example"
                  label="Example Select"
                  errors={errors.example}
                  options={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]}
                  placeholder="Select an option"
                  defaultValue=""
                  disabled={false}
                  readOnly={false}
                  rules={{ required: 'This field is required' }}
                  register={register}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Button
                    endIcon={<FaCirclePlus size={14} />}
                    component="label"
                    // onClick={unitToggle}
                    sx={{
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      width: 'fit-content',
                      textTransform: 'capitalize',
                      color: '#3572EF',
                    }}
                  >
                    New Unit
                  </Button>
                  <NativeSelect
                   name="example"
                   label="Example Select"
                   errors={errors.example}
                   options={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]}
                   placeholder="Select an option"
                   defaultValue=""
                   disabled={false}
                   readOnly={false}
                   rules={{ required: 'This field is required' }}
                   register={register}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              width: '30%',
              display: 'flex',
              // alignItems: 'center',
              gap: 1.5,
              flexDirection: { xs: 'column' },
            }}
          >
            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  flexDirection: { xs: 'column' },
                }}
              >
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="raw_material"
                      control={
                        <Radio
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                        />
                      }
                      label={
                        <Typography variant="body2">Raw Material</Typography>
                      }
                    />
                    <FormControlLabel
                      value="finish_product"
                      control={
                        <Radio
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                        />
                      }
                      label={
                        <Typography variant="body2">Finish Product</Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>

              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  flexDirection: { xs: 'column' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  {/* <Typography variant="h5" sx={{ fontSize: 12 }}>
                    Product Type
                  </Typography> */}
                  <NativeSelect
                    name="example"
                    label="Example Select"
                    errors={errors.example}
                    options={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]}
                    placeholder="Select an option"
                    defaultValue=""
                    disabled={false}
                    readOnly={false}
                    rules={{ required: 'This field is required' }}
                    register={register}
                  />
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  // gap: 2.5,
                  flexDirection: { xs: 'column' },
                }}
              >
                <ProductImage
                  photos={photos}
                  setPhotos={setPhotos}
                ></ProductImage>
              </CardContent>
            </Card>

            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  // alignItems: 'center',
                  // gap: 0.2,
                  flexDirection: { xs: 'column' },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasBatch == 1}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setHasBatch(1)
                          : setHasBatch(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)', // Scale down the checkbox
                        '& .MuiSvgIcon-root': { fontSize: 24 }, // Adjust the icon size within the checkbox
                      }}
                    />
                  }
                  label="Has Batch"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasExpired == 1}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setHasExpired(1)
                          : setHasExpired(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)',
                        '& .MuiSvgIcon-root': { fontSize: 24 },
                      }}
                    />
                  }
                  label="Has Expired"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={disableEcommerce == 1}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setDisableEcommerce(1)
                          : setDisableEcommerce(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)',
                        '& .MuiSvgIcon-root': { fontSize: 24 },
                      }}
                    />
                  }
                  label="Disable For Ecommerce"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stockOutSell == 1}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setStockOutSell(1)
                          : setStockOutSell(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)',
                        '& .MuiSvgIcon-root': { fontSize: 24 },
                      }}
                    />
                  }
                  label="Continue Sell If Stockout"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  // alignItems: 'center',
                  // gap: 0.2,
                  flexDirection: { xs: 'column' },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasSerial == 1}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setHasSerial(1)
                          : setHasSerial(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)', // Scale down the checkbox
                        '& .MuiSvgIcon-root': { fontSize: 24 }, // Adjust the icon size within the checkbox
                      }}
                    />
                  }
                  label="Has Serial Key"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasSerial == 2}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setHasSerial(2)
                          : setHasSerial(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)', // Scale down the checkbox
                        '& .MuiSvgIcon-root': { fontSize: 24 }, // Adjust the icon size within the checkbox
                      }}
                    />
                  }
                  label="Has Serial Key By Manufacture"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  // alignItems: 'center',
                  // gap: 0.2,
                  flexDirection: { xs: 'column' },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={warrantyType == 1}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setWarrantyType(1)
                          : setWarrantyType(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)', // Scale down the checkbox
                        '& .MuiSvgIcon-root': { fontSize: 24 }, // Adjust the icon size within the checkbox
                      }}
                    />
                  }
                  label="Warranty By Purchase"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={warrantyType == 2}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setWarrantyType(2)
                          : setWarrantyType(0);
                      }}
                      sx={{
                        transform: 'scale(0.8)', // Scale down the checkbox
                        '& .MuiSvgIcon-root': { fontSize: 24 }, // Adjust the icon size within the checkbox
                      }}
                    />
                  }
                  label="Has Serial Key By Manufacture"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '.7rem', md: '.8rem' }, // Set font size for the label text
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        <AddUnitTypeModal
          handleOpenAddUnitType={handleOpenAddUnitType}
          handleCloseAddUnitType={handleCloseAddUnitType}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default AddProduct;
