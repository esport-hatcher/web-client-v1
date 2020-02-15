import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: IconProp;
    className: string;
}

export const RoundButton: React.FC<IProps> = React.memo(
    ({ onClick, icon, className }) => {
        return (
            <button className={`btn btn--round ${className}`} onClick={onClick}>
                <FontAwesomeIcon icon={icon} className='btn-round__icon' />
            </button>
        );
    }
);
