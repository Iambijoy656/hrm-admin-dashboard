import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Options } from '../../../types/Modals';
import LabelOutlineInput from '../../ui/LabelOutlineInput';
import NativeSelect from '../../ui/NativeSelect';

export default function AddUnitTypeModal() {
  const unitTypesOptions: Options[] = [
    { value: 'Piece', label: 'Piece' },
    { value: 'Kilogram', label: 'Kilogram' },
  ];

  type Inputs = {
    code: string;
    name: string;
    base_unit: string;
    operator:string ,
    operation_value:string;
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
        Add Unit Type
      </Typography>
      <Box component={'div'} id="transition-modal-description" sx={{ mt: 3 }}>
        <LabelOutlineInput
          disabled={false}
          readonly={false}
          name="code"
          label={'Code'}
          fieldID={'name'}
          defaultValue={''}
          register={register}
          type="text"
          errors={errors?.code}
          placeholder={'Code'}
          rules={{
            required: 'Code is required',
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid email input',
            // },
          }}
        />
      </Box>

      <Box component={'div'} id="transition-modal-description" sx={{ mt: 3 }}>
        {/* <TextAreaInput
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
        /> */}

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
            required: 'Name is required',
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid email input',
            // },
          }}
        />
      </Box>

      <Box component={'div'} id="transition-modal-description" sx={{ mt: 3 }}>
        <NativeSelect
          name="base_unit"
          label="Base Unit"
          errors={errors.base_unit}
          options={unitTypesOptions}
          placeholder="Select an option"
          defaultValue=""
          disabled={false}
          readOnly={false}
          rules={{ required: 'This field is required' }}
          register={register}
        />
      </Box>
      <Box component={'div'} id="transition-modal-description" sx={{ mt: 3 }}>
        <LabelOutlineInput
          disabled={false}
          readonly={false}
          name="operator"
          label={'Operator'}
          fieldID={'operator'}
          defaultValue={''}
          register={register}
          type="text"
          errors={errors?.operator}
          placeholder={'Operator'}
          rules={{
            required: 'Operator is required',
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid email input',
            // },
          }}
        />
      </Box>
      
        <Box component={'div'} id="transition-modal-description" sx={{ mt: 3 }}>
        <LabelOutlineInput
          disabled={false}
          readonly={false}
          name="operation_value"
          label={'Operation Value'}
          fieldID={'operation_value'}
          defaultValue={''}
          register={register}
          type="text"
          errors={errors?.operation_value}
          placeholder={'Operation Value'}
          rules={{
            required: 'Operation Value is required',
            // pattern: {
            //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            //   message: 'Invalid email input',
            // },
          }}
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
