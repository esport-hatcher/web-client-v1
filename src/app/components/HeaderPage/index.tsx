import React from 'react';

interface IProps {
    title: string;
}

export const HeaderPage: React.FC<IProps> = ({ title }) => {
    return (
        <div className='header'>
            <h1 className='header__title title title--xs'>{title}</h1>
        </div>
    );
};
