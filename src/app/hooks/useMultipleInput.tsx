import React, { useState } from 'react';

interface IInputs {
    [key: string]: string;
}

export const useMultipleInputs = <T extends IInputs>(
    InitialValues: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [inputs, setInputs] = useState<T>(InitialValues);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    return [inputs, onChange];
};
