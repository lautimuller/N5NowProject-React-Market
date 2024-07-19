import { toast } from 'react-toastify';

const notify = (message: string, type: 'success' | 'error') => {
  const options = {
    position: "top-right" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type === 'success') {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};

export { notify };
