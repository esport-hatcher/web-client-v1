import React from 'react';

interface IHeaderProps {
    title: string;
}

export const HeaderPage = ({ title }: IHeaderProps): JSX.Element => {
    return (
        <div className='header'>
            <h1 className='header__title title title--xs'>{title}</h1>
        </div>
    );
};
