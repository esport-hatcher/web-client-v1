import React from 'react';

interface IRoundButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const RoundButton = ({ onClick }: IRoundButtonProps): JSX.Element => {
    return (
        <div>
            <button className='btn btn--round' onClick={onClick}>
                <i className='fas fa-chevron-right' />
            </button>
        </div>
    );
};
