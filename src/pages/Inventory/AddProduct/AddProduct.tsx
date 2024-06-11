import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import JoditEditor from 'jodit-react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { TreeNode } from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddBrandModal from '../../../components/Modal/BrandModal/AddBrandModal';
import AddCategoryModal from '../../../components/Modal/CategoryModal/AddCategoryModal';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import AddUnitTypeModal from '../../../components/Modal/UnitType/AddUnitTypeModal';
import ProductImage from '../../../components/ProductImage/ProductImage';
import LabelOutlineInput from '../../../components/ui/LabelOutlineInput';
import NativeSelect from '../../../components/ui/NativeSelect';
import TreeSelect from '../../../components/ui/TreeSelect';
import { ThemeContext } from '../../../context/ThemeProvider';
import '../../../css/categorySelect.css';
import '../../../css/editor.css';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Options, Photo } from '../../../types/Modals';
import api from '../../../Utilities/api';

interface Category {
  id: number;
  parent_id?: number;
  name_s: string;
  label?: string;
  value?: number;
  children: Category[];
  checked?: boolean;
}

interface EditorStyle {
  '--jd-color-background-default': string;
  '--jd-color-panel': string;
  '--jd-color-border': string;
  backgroundColor: string;
}

const AddProduct = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [openAddUnitTypeModal, setOpenAddUnitTypeModal] =
    useState<boolean>(false);
  const [openAddBrandModal, setOpenAddBrandModal] = useState<boolean>(false);
  const [openAddModel, setOpenAddModel] = useState<boolean>(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] =
    useState<boolean>(false);
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
  const [taxData, setTaxData] = useState([]);
  const [tax, setTax] = useState({});
  const [openTreeSelect, setOpenTreeSelect] = useState<boolean>(false);
  const [showTree, setShowTree] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  //-----
  const [processDataForCategory, setProcessDataForCategory] = useState<
    Category[]
  >([]);
  const [parentCategory, setParentCategory] = useState<Category | {}>({});

  // console.log('parentCategory', processDataForCategory);
  // console.log('parentCategory', parentCategory);

  console.log('selectedCategory', selectedCategory);

  const {
    register,
    handleSubmit,
    // watch,
    control,
    clearErrors,
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

  type Inputs = {
    name: string;
    sku: string;
    hsn: string;
    unit_type: string;
    brand: string;
    product_type: string;
    select_model: string;
    barcode_type: string;
    alert_quantity: number;
    opening_stock_quantity: number;
    margin_on_selling_price: number;
    margin_on_min_selling_price: number;
    tax: string;
    tax_method: string;
    measurement_unit: string;
    weight_unit: string;
    p_height: number;
    p_width: number;
    p_length: number;
    p_weight: number;
    package_height: number;
    package_width: number;
    package_length: number;
    package_weight: number;
    note: string;
  };

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

  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const allTax = await api.get('/inventory-management/product/tax/');
        const finalArray = allTax?.data?.body?.data.map(
          (item: { id: any; name_s: any; tax_s: any }) => ({
            id: item?.id,
            label: `${item?.name_s}@${item?.tax_s}`,
          }),
        );
        setTaxData(finalArray);
      } catch (error) {
        console.error('Error fetching tax data:', error);
      }
    };

    fetchTaxData();
  }, []);

  const config = {
    // style: {
    //   backgroundColor: mode === 'dark' ? '#000' : '#ffffff'
    // },
    theme: mode,
    readonly: false,
    minHeight: 300,
    placeholder: 'Start typing...',
    // toolbarButtonSize: "small",
    disablePlugins:
      'about,ai-assistant,class-span,inline-popup,fullsize,iframe,powered-by-jodit,print,search,speech-recognize,spellcheck,video',
    buttons:
      'bold,italic,underline,strikethrough,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,image,cut,copy,paste,selectall,copyformat,hr',
  };

  const editorStyle: EditorStyle = {
    '--jd-color-background-default': mode === 'dark' ? '#1e1e1e' : '#ffffff',
    '--jd-color-panel': mode === 'dark' ? '#282828' : '#ffffff',
    '--jd-color-border': mode === 'dark' ? '#343434' : '#c4c4c4',
    backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
  };

  //--------------------------------Category Select----------------------------------------------//

  const buildDirectoryTree = (categories: Category[]): Category[] => {
    const directoryMap = new Map<number, Category>();
    const rootDirectories: Category[] = [];

    categories.forEach((category) => {
      category.label = category.name_s;
      category.value = category.id;
      category.children = [];
      directoryMap.set(category.id, category);
    });

    categories.forEach((category) => {
      if (category.parent_id) {
        const parent = directoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(category);
        }
      } else {
        rootDirectories.push(category);
      }
    });

    return rootDirectories;
  };

  const selectSelectedData = (data: Category[], selected: Category) => {
    data.forEach((item) => {
      item.checked = item.id === selected.id ? selected.checked : false;
      if (item.children.length > 0) {
        selectSelectedData(item.children, selected);
      }
    });

    if (selected.checked) {
      setParentCategory(selected);
    } else {
      setParentCategory({});
    }
    setProcessDataForCategory([...data]);
  };

  const handleValueForCategory = useCallback(
    (currentNode: TreeNode, selectedNodes: TreeNode[]) => {
      const selectedCategory = currentNode as unknown as Category;
      selectSelectedData(processDataForCategory, selectedCategory);
    },
    [processDataForCategory],
  );

  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/inventory-management/category/all');
      const categories = response.data.body.data as Category[];
      const outputData = buildDirectoryTree(categories);
      setProcessDataForCategory(outputData);
    };
    getData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb Parent="Inventory" pageName="Add Product" />
      <ThemeProvider theme={createTheme({ palette: { mode: mode } })}>
        <Box
          onClick={() => {
            if (!selectedCategory) {
              setOpenTreeSelect(false);
            }
            setShowTree(false);
          }}
          onSubmit={handleSubmit(onSubmit)}
          component={'form'}
          className="my-16 flex items-start gap-3"
        >
          <Box
            sx={{
              width: '70%',
              display: 'flex',
              // alignItems: 'center',
              gap: 2.5,
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

            <Card
              sx={{
                width: '100%',
              }}
            >
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
                    onClick={() =>
                      setOpenAddUnitTypeModal(!openAddUnitTypeModal)
                    }
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
                    name="unit_type"
                    label="Unit Type"
                    errors={errors.unit_type}
                    options={[
                      { value: '1', label: 'One' },
                      { value: '2', label: 'Two' },
                    ]}
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
                    onClick={() => setOpenAddBrandModal(!openAddBrandModal)}
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
                    New Brand
                  </Button>
                  <NativeSelect
                    name="brand"
                    label="Select Brand"
                    errors={errors.brand}
                    options={[
                      { value: '1', label: 'One' },
                      { value: '2', label: 'Two' },
                    ]}
                    placeholder="Select an option"
                    defaultValue=""
                    disabled={false}
                    readOnly={false}
                    rules={{ required: 'This field is required' }}
                    register={register}
                  />
                </Box>
              </CardContent>

              <CardContent
                sx={{
                  // width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  marginTop: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Button
                    endIcon={<FaCirclePlus size={14} />}
                    component="label"
                    onClick={() => setOpenAddModel(!openAddModel)}
                    sx={{
                      position: 'absolute',
                      top: -34,
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      width: 'fit-content',
                      textTransform: 'capitalize',
                      color: '#3572EF',
                    }}
                  >
                    Model
                  </Button>
                  <NativeSelect
                    name="select_model"
                    label="Select Model"
                    errors={errors.select_model}
                    options={[
                      { value: '1', label: 'One' },
                      { value: '2', label: 'Two' },
                    ]}
                    placeholder="Select a Modal"
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
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <NativeSelect
                    name="barcode_type"
                    label="Barcode Type"
                    errors={errors.barcode_type}
                    options={[
                      { value: 'Code 128', label: 'Code 128' },
                      { value: 'Code 39', label: 'Code 39' },
                      { value: 'UPC-A', label: 'UPC-A' },
                      { value: 'UPC-E', label: 'UPC-E' },
                      { value: 'EAN-8', label: 'EAN-8' },
                      { value: 'EAN-13', label: 'EAN-13' },
                    ]}
                    placeholder="Select a Barcode Type"
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
              <CardContent>
                <Button
                  onClick={() => setOpenAddCategoryModal(!openAddCategoryModal)}
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
                  New Category
                </Button>
                <Box>
                  <Box
                    component={'div'}
                    onClick={(e) => {
                      setShowTree(!showTree);
                      setOpenTreeSelect(true);
                      e.stopPropagation();
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px  solid gray ',
                      width: '100%',
                      borderRadius: 1,
                      marginTop: 1,
                      height: 36,
                      pl: 1.8,
                      pr: 4,
                      py: 0.8,
                      cursor: 'text',
                      position: 'relative',
                    }}
                  >
                    <Box
                      className="bg-[#ffffff] dark:bg-[#1e1e1e]"
                      component={'label'}
                      sx={{
                        transition: '.1s',
                        px: 0.5,
                        paddingRight: 1.5,
                        fontSize: openTreeSelect ? '.7rem' : '.9rem',
                        position: 'absolute',
                        top: openTreeSelect ? -13 : 4,
                        color: openTreeSelect ? '#1976d2' : '',
                        fontWeight: openTreeSelect ? 500 : '',
                      }}
                    >
                      Category
                    </Box>

                    <Box sx={{ fontSize: '.8rem' }}>
                      {openTreeSelect && selectedCategory?.name_s}
                    </Box>

                    <Box
                      component={'span'}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 4,
                      }}
                    >
                      {showTree ? (
                        <MdArrowDropUp
                          size={24}
                          className="text-slate-600 dark:text-white"
                        />
                      ) : (
                        <MdArrowDropDown
                          size={24}
                          className="text-slate-600 dark:text-white"
                        />
                      )}
                    </Box>
                  </Box>
                  {showTree && (
                    <Box
                      sx={{ py: 1, paddingLeft: 3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <TreeSelect
                        setShowTree={setShowTree}
                        tree={processDataForCategory}
                        setSelected={setSelectedCategory}
                      />
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                pt: 2,
                width: '100%',
              }}
            >
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="alert_quantity"
                    label={'Alert Quantity'}
                    fieldID={'alert_quantity'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.alert_quantity}
                    placeholder={'Alert Quantity'}
                    rules={{
                      required: 'alert quantity is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="opening_stock_quantity"
                    label={'Opening Stock Quantity'}
                    fieldID={'opening_stock_quantity'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.opening_stock_quantity}
                    placeholder={'Opening Stock Quantity'}
                    rules={{
                      required: 'opening stock quantity is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
                  />
                </Box>
              </CardContent>

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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="margin_on_selling_price"
                    label={'Margin On Selling Price'}
                    fieldID={'margin_on_selling_price'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.margin_on_selling_price}
                    placeholder={'Alert Quantity'}
                    rules={{
                      required: 'Margin On Selling Price is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="margin_on_min_selling_price"
                    label={'Margin On Min Selling Price'}
                    fieldID={'margin_on_min_selling_price'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.margin_on_min_selling_price}
                    placeholder={'margin_on_min_selling_price'}
                    rules={{
                      required: 'margin_on_min_selling_price is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
                  />
                </Box>
              </CardContent>
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
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <NativeSelect
                    name="tax"
                    label="Tax"
                    errors={errors.tax}
                    options={taxData}
                    placeholder="Select a Tax"
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
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <NativeSelect
                    name="tax_method"
                    label="Tax Method"
                    errors={errors.tax_method}
                    options={[
                      { value: 'Exclusive', label: 'Exclusive' },
                      { value: 'Inclusive', label: 'Inclusive' },
                    ]}
                    placeholder="Select a Tax Method"
                    defaultValue=""
                    disabled={false}
                    readOnly={false}
                    rules={{ required: 'This field is required' }}
                    register={register}
                  />
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                pt: 2,
                width: '100%',
              }}
            >
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
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <NativeSelect
                    name="measurement_unit"
                    label="Size unit"
                    errors={errors.measurement_unit}
                    options={[
                      { value: 'inch', label: 'inch' },
                      { value: 'cm', label: 'cm' },
                      { value: 'mm', label: 'mm' },
                    ]}
                    placeholder="Select a unit"
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
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <NativeSelect
                    name="weight_unit"
                    label="Weight Unit"
                    errors={errors.weight_unit}
                    options={[
                      { value: 'Gram (g)', label: 'Gram (g)' },
                      {
                        value: 'Kilogram (kg)',
                        label: 'Kilogram (kg)',
                      },
                    ]}
                    placeholder="Select Weight Unit"
                    defaultValue=""
                    disabled={false}
                    readOnly={false}
                    rules={{ required: 'This field is required' }}
                    register={register}
                  />
                </Box>
              </CardContent>

              <Typography
                sx={{
                  fontSize: 16,
                  px: 2,
                }}
              >
                Product size
              </Typography>
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="p_height"
                    label={'Product Height'}
                    fieldID={'p_height'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.p_height}
                    placeholder={'Product Height'}
                    rules={{
                      required: 'Product Height is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="p_width"
                    label={'Product Width'}
                    fieldID={'p_width'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.p_width}
                    placeholder={'Product Width'}
                    rules={{
                      required: 'Product width is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
                  />
                </Box>
              </CardContent>
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="p_length"
                    label={'Product Length'}
                    fieldID={'p_length'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.p_length}
                    placeholder={'Product Length'}
                    rules={{
                      required: 'Product Length is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="p_weight"
                    label={'Product Weight'}
                    fieldID={'p_weight'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.p_weight}
                    placeholder={'Product Weight'}
                    rules={{
                      required: 'Product Weight is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
                  />
                </Box>
              </CardContent>

              <Typography
                sx={{
                  fontSize: 16,
                  px: 2,
                }}
              >
                Package size
              </Typography>
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="package_height"
                    label={'Package Height'}
                    fieldID={'package_height'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.package_height}
                    placeholder={'Package Height'}
                    rules={{
                      required: 'Package Height is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="package_width"
                    label={'Package Width'}
                    fieldID={'package_width'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.package_width}
                    placeholder={'Package Width'}
                    rules={{
                      required: 'Package width is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
                  />
                </Box>
              </CardContent>
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="package_length"
                    label={'Package Length'}
                    fieldID={'package_length'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.package_length}
                    placeholder={'Package Length'}
                    rules={{
                      required: 'Package Length is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
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
                  <LabelOutlineInput
                    disabled={false}
                    readonly={false}
                    name="package_weight"
                    label={'Package Weight'}
                    fieldID={'package_weight'}
                    defaultValue={0}
                    register={register}
                    type="text"
                    errors={errors?.package_weight}
                    placeholder={'Package Weight'}
                    rules={{
                      required: 'Package Weight is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Use only number',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            <Box
              component={'div'}
              className={`editor-container ${
                mode === 'dark' ? 'dark-mode' : ''
              }`}
              style={editorStyle as React.CSSProperties}
            >
              <Box component={'div'} sx={{ mt: 1 }}>
                <Card>
                  <CardContent>
                    <Controller
                      name="note"
                      control={control}
                      defaultValue={''}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <JoditEditor
                          ref={editor}
                          value={value}
                          config={config}
                          onBlur={() => onBlur()}
                          onChange={(newContent) => onChange(newContent)}
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Box>
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
                    name="product_type"
                    label="Product Type"
                    errors={errors.product_type}
                    options={productTypesOptions}
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

        <ConfirmModal
          openModal={openAddUnitTypeModal}
          setOpenModal={setOpenAddUnitTypeModal}
        >
          <AddUnitTypeModal />
        </ConfirmModal>

        <ConfirmModal
          openModal={openAddBrandModal}
          setOpenModal={setOpenAddBrandModal}
        >
          <AddBrandModal />
        </ConfirmModal>

        <ConfirmModal openModal={openAddModel} setOpenModal={setOpenAddModel}>
          <AddBrandModal />
        </ConfirmModal>

        <ConfirmModal
          openModal={openAddCategoryModal}
          setOpenModal={setOpenAddCategoryModal}
        >
          <AddCategoryModal />
        </ConfirmModal>
      </ThemeProvider>
    </DefaultLayout>
  );
};

export default AddProduct;
