import React, { useContext, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { Context } from '@/context/SnackbarContext';

export default function SnackBar({}) {
  const { snackBar }: any = useContext(Context);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    snackBar && setOpen(snackBar.open);
  }, [snackBar]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={snackBar.timer}
        onClose={handleClose}
      >
        <SnackbarContent
          message={snackBar.message}
          classes={{
            root: `
                ${snackBar.type === 'error' && 'bg-red-400'}
                ${snackBar.type === 'sucess' && 'bg-green-400'}
                min-w-[350px] flex justify-center
              `,
          }}
        />
      </Snackbar>
    </>
  );
}
