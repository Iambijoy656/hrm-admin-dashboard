import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import DropdownTreeSelect, { TreeNode } from 'react-dropdown-tree-select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Options } from '../../../types/Modals';
import api from '../../../Utilities/api';
import LabelOutlineInput from '../../ui/LabelOutlineInput';
import NativeSelect from '../../ui/NativeSelect';
import TextAreaInput from '../../ui/TextAreaInput';
import '../.././../css/categorySelect.css';

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
    <div>
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
      <Box sx={{ mt: 2 }}>
        <DropdownTreeSelect
          className="mdl-demo"
          // mode="radioSelect"
          data={processDataForCategory}
          onChange={handleValueForCategory}
        />
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
    </div>
  );
}
