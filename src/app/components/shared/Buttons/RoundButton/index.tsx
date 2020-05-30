import React from 'react';
import { IconType } from 'react-icons/lib';

interface IProps {
    Icon: IconType;
    className: string;
    type: 'submit' | 'button';
    loading?: Boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RoundButton: React.FC<IProps> = React.memo(
    ({ onClick, Icon, className, type = 'button', loading = false }) => {
        // TODO: return spinner when loading set to true
        return (
            <button
                type={type}
                className={`btn btn--round ${className}`}
                onClick={onClick}
            >
                <Icon className='btn-round__icon' />
            </button>
        );
    }
);
