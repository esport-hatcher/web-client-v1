import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IProps {
    className?: string;
}

export const Spinner: React.FC<IProps> = React.memo(({ className }) => {
    return (
        <AiOutlineLoading3Quarters className={`icon--spinner ${className}`} />
    );
});
