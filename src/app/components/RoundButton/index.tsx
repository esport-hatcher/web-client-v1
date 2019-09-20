import React from 'react';
import { Icon } from '@/components';
import { IIcons } from '../Icon';

interface IProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: keyof IIcons;
    className: string;
}

export const RoundButton: React.FC<IProps> = React.memo(
    ({ onClick, icon, className }) => {
        return (
            <button className={`btn btn--round ${className}`} onClick={onClick}>
                <Icon name={icon} className='btn-round__icon' />
            </button>
        );
    }
);
