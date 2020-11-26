import React from 'react';
import { toast } from 'react-toastify';
import { CustomToast, IToastConfig } from 'app/components';

export const sendToast = (config: IToastConfig) => {
    // toast will always be toast.success for the closeButton and progressBar to be white
    toast.success(<CustomToast {...config} />, {
        className: `toast toast--${config.type}`,
        toastId: config.id,
    });
};
