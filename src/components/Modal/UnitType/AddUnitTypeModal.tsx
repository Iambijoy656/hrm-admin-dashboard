import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Options } from '../../../types/Modals';
import NativeSelect from '../../ui/NativeSelect';
import TextAreaInput from '../../ui/TextAreaInput';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '40%' },
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 3,
};

type ModalType = {
  handleOpenAddUnitType: () => void;
  handleCloseAddUnitType: () => void;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddUnitTypeModal({
  handleCloseAddUnitType,
  handleOpenAddUnitType,
  modalOpen,
  setModalOpen,
}: ModalType) {
  const unitTypesOptions: Options[] = [
    { value: 'Single', label: 'Standard' },
    { value: 'Combo', label: 'Combo' },
    { value: 'Service', label: 'Service' },
  ];

  type Inputs = {
    unit_type: string;
    description: string;
    status: string;
    example: string
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
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen} // Corrected here
        onClose={handleCloseAddUnitType}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              sx={{ fontSize: 18 }}
              component="h2"
            >
              Add Unit Type
            </Typography>
            <Box
              component={'div'}
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
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
              component={'div'}
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
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

            <Box
              component={'div'}
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
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
              component={'div'}
              sx={{
                display: 'flex',
                gap: 2,
                marginTop: '30px',
              }}
            >
              <Button
                size="small"
                sx={{ textTransform: 'capitalize' }}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
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
                Success
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
