import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
    icon: IconProp;
    className: string;
    rotation?: 90 | 180 | 270 | undefined;
    loading?: boolean;
}

export const IconButton: React.FC<IProps> = ({
    children,
    icon,
    className,
    rotation,
    loading,
}) => {
    return (
        <button
            className={`btn btn--icon-holder ${className} ${loading &&
                'btn--disabled'}`}
            disabled={loading}
        >
            <p className='btn--icon-holder__text'>{children}</p>
            <FontAwesomeIcon
                icon={icon}
                rotation={rotation}
                className={`btn--icon-holder__icon ${loading &&
                    'icon--rotate'}`}
            />
        </button>
    );
};
