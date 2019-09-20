import React from 'react';
import { Icon } from '@/components';

interface IProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
}

export const RoundButton: React.FC<IProps> = React.memo(
    ({ onClick, className }) => {
        return (
            <button className={`btn-round ${className}`} onClick={onClick}>
                <Icon name='chevron_right' className='btn-round__icon' />
            </button>
        );
    }
);
