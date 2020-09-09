import React from 'react';
import { IconType } from 'react-icons/lib';
import { Spinner } from '../../Spinner';

interface IProps {
    Icon: IconType;
    className?: string;
    type?: 'submit' | 'button';
    loading?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const IconButton: React.FC<IProps> = React.memo(
    ({
        children,
        Icon,
        className,
        type = 'button',
        loading = false,
        disabled = false,
        onClick,
    }) => {
        return (
            <button
                type={type}
                onClick={onClick}
                className={`btn btn--icon-holder ${className} ${loading &&
                    'btn--disabled'}`}
                disabled={loading || disabled}
            >
                {children && (
                    <p className='btn--icon-holder__text'>{children}</p>
                )}
                {loading ? (
                    <Spinner className='btn--icon-holder__icon' />
                ) : (
                    <Icon className='btn--icon-holder__icon' />
                )}
            </button>
        );
    }
);
