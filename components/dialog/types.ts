import { Dispatch, SetStateAction } from 'react';

export interface DialogProps {
  children?: React.ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
  title?: string;
}
