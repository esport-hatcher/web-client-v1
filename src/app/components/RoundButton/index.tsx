import React from 'react';

interface IProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RoundButton: React.FC<IProps> = React.memo(({ onClick }) => {
    return (
        <div>
            <button className='btn btn--round' onClick={onClick}>
                <i className='fas fa-chevron-right' />
            </button>
        </div>
    );
});
