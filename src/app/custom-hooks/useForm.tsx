import React, { useState, useCallback } from 'react';

interface IInputs {
    [key: string]: string;
}

export const useForm = <T extends IInputs>(
    InitialValues: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [inputs, setInputs] = useState<T>(InitialValues);

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setInputs(
                (_inputs: T): T => {
                    return {
                        ..._inputs,
                        [e.target.name]: e.target.value,
                    };
                }
            );
        },
        [setInputs]
    );
    return [inputs, onChange];
};
