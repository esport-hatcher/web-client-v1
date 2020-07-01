import React from 'react';

interface IProps {
    title: string;
    className?: string;
    size?: 'xs' | 'sm' | 'md' | 'xl';
}

export const BoxHeader: React.FC<IProps> = ({
    title,
    className,
    size = 'sm',
    children,
}) => {
    return (
        <div className={className + ' box-header'}>
            <div className='box-header__title'>
                <p className={`title title--${size}`}>{title}</p>
            </div>
            {children}
        </div>
    );
};
