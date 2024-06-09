import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import * as React from 'react';

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
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function ConfirmModal({
  setOpenModal,
  openModal,
  children,
}: ModalType) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={() => setOpenModal(!openModal)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={style}>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              // gap: 2,
              // marginTop: '30px',
            }}
          >
            <Button
              onClick={() => setOpenModal(!openModal)}
              // size="small"
              sx={{
                textTransform: 'capitalize',
                fontSize: '18px',
                maxWidth: 10,
                p: 1.2,
              }}
              // variant="outlined"
              color="error"
            >
              <RxCross2 />
            </Button>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
