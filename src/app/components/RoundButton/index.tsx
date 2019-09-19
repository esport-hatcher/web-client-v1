import React from 'react';
import { Icon } from '@/components';

interface IProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RoundButton: React.FC<IProps> = React.memo(({ onClick }) => {
    return (
        <div>
            <button className='btn btn--round' onClick={onClick}>
                <Icon name='chevron_right' className='btn--round__icon' />
            </button>
        </div>
    );
});
