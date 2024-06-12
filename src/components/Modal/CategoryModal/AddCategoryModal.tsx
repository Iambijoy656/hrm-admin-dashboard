import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { TreeNode } from 'react-dropdown-tree-select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { Options } from '../../../types/Modals';
import api from '../../../Utilities/api';
import '../.././../css/categorySelect.css';
import LabelOutlineInput from '../../ui/LabelOutlineInput';
import NativeSelect from '../../ui/NativeSelect';
import TextAreaInput from '../../ui/TextAreaInput';
import TreeSelect from '../../ui/TreeSelect';

interface Category {
  id: number;
  parent_id?: number;
  name_s: string;
  label?: string;
  value?: number;
  children: Category[];
  checked?: boolean;
}

export default function AddCategoryModal() {
  const [selectedCompany, setSelectedCompany] = useState(
    localStorage.getItem('com_id'),
  );
  const [selectedBranch, setSelectedBranch] = useState(
    localStorage.getItem('branch_id'),
  );
  const [openTreeSelect, setOpenTreeSelect] = useState<boolean>(false);
  const [showTree, setShowTree] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [processDataForCategory, setProcessDataForCategory] = useState<
    Category[]
  >([]);
  const [parentCategory, setParentCategory] = useState<Category | {}>({});

  const unitTypesOptions: Options[] = [
    { value: 'Single', label: 'Standard' },
    { value: 'Combo', label: 'Combo' },
    { value: 'Service', label: 'Service' },
  ];

  const statusOption: Options[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  type Inputs = {
    name: string;
    description: string;
    status: string;
    code: string;
  };

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  //--------------------------------------------------//

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
    <Box
      onClick={() => {
        if (!selectedCategory) {
          setOpenTreeSelect(false);
        }
        setShowTree(false);
      }}
    >
      <Typography
        id="transition-modal-title"
        sx={{ fontSize: 18 }}
        component="h2"
      >
        Add Category
      </Typography>

      <Box component={'div'} id="transition-modal-description" sx={{ mt: 2 }}>
        <LabelOutlineInput
          disabled={false}
          readonly={false}
          name="name"
          label={'Name'}
          fieldID={'name'}
          defaultValue={''}
          register={register}
          type="text"
          errors={errors?.name}
          placeholder={' Name'}
          rules={{
            required: ' Name is required',
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid email input',
            // },
          }}
        />
      </Box>
      <Box component={'div'} id="transition-modal-description" sx={{ mt: 2 }}>
        <LabelOutlineInput
          disabled={false}
          readonly={false}
          name="code"
          label={'Code'}
          fieldID={'code'}
          defaultValue={''}
          register={register}
          type="text"
          errors={errors?.code}
          placeholder={'Code'}
          rules={{
            required: ' Code is required',
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid email input',
            // },
          }}
        />
      </Box>

      <Box component={'div'} id="transition-modal-description" sx={{ mt: 2 }}>
        <TextAreaInput
          label={'Description'}
          placeholder={'Description'}
          defaultValue={''}
          disabled={false}
          name={'description'}
          readonly={false}
          register={register}
          type="text"
          errors={errors?.description}
          fieldID={''}
          rules={{
            required: 'description is required',
          }}
        />
      </Box>
      <Box sx={{ position: 'relative', marginY: 1.5 }}>
        <Box
          className="hover:border-black dark:hover:border-white border border-[#c4c4c4] dark:border-[#505050] "
          component={'div'}
          onClick={(e) => {
            setShowTree(!showTree);
            setOpenTreeSelect(true);
            e.stopPropagation();
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            // border: '1px  solid',
            width: '100%',
            borderRadius: 1,
            marginTop: 1,
            height: 36,
            pl: 1.8,
            pr: 4,
            py: 0.8,
            cursor: 'pointer',
            position: 'relative',
            // '&:focus-within': {
            //   borderColor: '#90caf9',
            // },
          }}
        >
          <Box
            className="bg-[#ffffff] dark:bg-[#121212]"
            component={'label'}
            sx={{
              transition: '.1s',
              // px: 0.1,
              paddingRight: 1.5,
              fontSize: openTreeSelect ? '.7rem' : '.8rem',
              position: 'absolute',
              top: openTreeSelect ? -13 : 4,
              color: openTreeSelect ? '#1976d2' : '#ffff',
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
            className="bg-[#ffffff] dark:bg-[#2f2f2f] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
            sx={{
              py: 1,
              paddingLeft: 3,
              position: 'absolute',
              zIndex: 10,
              width: '100%',
              borderRadius: 1,
            }}
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

      <Box component={'div'} id="transition-modal-description" sx={{ mt: 2 }}>
        <NativeSelect
          name="status"
          label="Status"
          errors={errors.status}
          options={statusOption}
          placeholder="Select an option"
          defaultValue=""
          disabled={false}
          readOnly={false}
          rules={{ required: 'This field is required' }}
          register={register}
        />
      </Box>

      <Box
        component={'div'}
        sx={{
          display: 'flex',
          gap: 2,
          marginTop: '30px',
        }}
      >
        <Button
          size="small"
          sx={{
            textTransform: 'capitalize',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          }}
          variant="contained"
          color="success"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
