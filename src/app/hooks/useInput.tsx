import React, { useState } from 'react';

export const useInput = (
    initialValue: string = ''
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [input, setInput] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return [input, onChange];
};
