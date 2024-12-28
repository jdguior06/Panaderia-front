import { toast } from 'react-toastify';

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showNotification = {
  error: (message) => toast.error(message, toastConfig),
  success: (message) => toast.success(message, toastConfig),
  info: (message) => toast.info(message, toastConfig),
  warning: (message) => toast.warning(message, toastConfig),
};