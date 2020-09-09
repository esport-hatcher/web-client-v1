import React from 'react';
import { ToastContentProps } from 'react-toastify';
import {
    AiOutlineCheck,
    AiOutlineExclamationCircle,
    AiOutlineInfo,
} from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

type ToastType = 'error' | 'success';

export interface IToastConfig {
    title: string;
    content?: string;
    type: ToastType;
    Icon?: IconType;
}

const getIcon = (type: ToastType) => {
    switch (type) {
        case 'error':
            return AiOutlineExclamationCircle;
        case 'success':
            return AiOutlineCheck;
        default:
            return AiOutlineInfo;
    }
};

export const CustomToast: React.FC<IToastConfig &
    ToastContentProps> = React.memo(({ title, content, type, Icon }) => {
    const ToastIcon = Icon || getIcon(type);

    return (
        <div className='toast__container'>
            <ToastIcon className='toast__container__icon' />
            <h1 className='toast__container__title important-info important-info--md'>
                {title}
            </h1>
            {content && (
                <p className='toast__container__body body-text body-text--sm'>
                    {content}
                </p>
            )}
        </div>
    );
});
