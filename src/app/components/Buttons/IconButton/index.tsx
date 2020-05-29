import React from 'react';
import { IconType } from 'react-icons/lib';

interface IProps {
    Icon: IconType;
    className: string;
    type: 'submit' | 'button';
    loading: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const IconButton: React.FC<IProps> = ({
    children,
    Icon,
    className,
    type = 'button',
    loading = false,
    onClick,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn btn--icon-holder ${className} ${loading &&
                'btn--disabled'}`}
            disabled={loading}
        >
            <p className='btn--icon-holder__text'>{children}</p>
            <Icon className='btn--icon-holder__icon' />
        </button>
    );
};
