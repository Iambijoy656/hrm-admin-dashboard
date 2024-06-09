import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Options } from '../../../types/Modals';
import NativeSelect from '../../ui/NativeSelect';
import TextAreaInput from '../../ui/TextAreaInput';
export default function AddBrandModal() {
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

  return (
    <div>
      <Typography
        id="transition-modal-title"
        sx={{ fontSize: 18 }}
        component="h2"
      >
        Add Brand
      </Typography>
      <Box component={'div'} id="transition-modal-description" sx={{ mt: 2 }}>
        <NativeSelect
          name="name"
          label="Name"
          errors={errors.name}
          options={unitTypesOptions}
          placeholder="Select an option"
          defaultValue=""
          disabled={false}
          readOnly={false}
          rules={{ required: 'This field is required' }}
          register={register}
        />
      </Box>

      <Box component={'div'} id="transition-modal-description" sx={{ mt: 2 }}>
        <TextAreaInput
          label={'Select Unit Type'}
          placeholder={'Select a select-unit'}
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
