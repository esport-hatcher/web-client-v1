import React from 'react';
import { IIcons, Icon } from '../../Icon';

interface IProps {
    icon: keyof IIcons;
    className: string;
    loading?: boolean;
}

export const IconButton: React.FC<IProps> = ({
    children,
    icon,
    className,
    loading,
}) => {
    return (
        <button
            className={`btn btn--icon-holder ${className} ${loading &&
                'btn--disabled'}`}
            disabled={loading}
        >
            <p className='btn--icon-holder__text'>{children}</p>
            <Icon
                name={loading ? 'rotate_right' : icon}
                className={`btn--icon-holder__icon ${loading &&
                    'icon--rotate'}`}
            />
        </button>
    );
};
