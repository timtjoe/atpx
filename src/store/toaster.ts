// Add 'toast' to the import list
import { toast, ToastOptions } from 'react-hot-toast'; 
import { atom, useAtom } from 'jotai';
import React from 'react';

type ToastMessage = string | React.JSX.Element;

interface ToastState {
  message: ToastMessage | null;
  isActive: boolean;
}

const toastStateAtom = atom<ToastState>({
  message: null,
  isActive: false,
});

export const withToaster = () => {
  const [state, setState] = useAtom(toastStateAtom);

  const showToast = (message: ToastMessage, options?: ToastOptions) => {
    setState({ message, isActive: true });
    // This is the 'toast' name that was missing
    toast(message, options); 
  };

  const hideToast = () => {
    setState({ message: null, isActive: false });
    toast.dismiss();
  };

  return { showToast, hideToast, toastState: state };
};