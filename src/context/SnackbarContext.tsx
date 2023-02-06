import { SnackbarProps } from '@/types/snackBarTypes';
import { createContext, ReactElement, useContext, useState } from 'react';

type Props = {
  children: ReactElement;
};

const initialValue = {
  message: '',
  type: '',
  timer: 0,
  open: false,
};
export const Context = createContext<SnackbarProps>(initialValue);

export const SnackbarProvider = ({ children }: Props) => {
  const [snackBar, setSnackBar] = useState<SnackbarProps>({
    message: '',
    type: '',
    timer: 0,
    open: false,
  });

  return <Context.Provider value={{ snackBar, setSnackBar }}>{children}</Context.Provider>;
};
