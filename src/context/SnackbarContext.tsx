import { createContext, ReactElement, useContext, useState } from 'react';

type Props = {
  children: ReactElement;
};

type SnackbarProps = {
  message: string;
  type: string;
  timer: number;
  open: boolean;
};

const initialValue = {
  message: '',
  type: '',
  timer: 0,
  open: false,
};
export const Context = createContext({});

export const SnackbarProvider = ({ children }: Props) => {
  const [snackBar, setSnackBar] = useState<SnackbarProps>({
    message: '',
    type: '',
    timer: 0,
    open: false,
  });

  return <Context.Provider value={{ snackBar, setSnackBar }}>{children}</Context.Provider>;
};
