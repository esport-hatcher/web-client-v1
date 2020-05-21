import { useState } from 'react';

export interface IInputEvent {
    target: {
        value: string;
    };
}

export const useInput = (
    initialValue: string = ''
): [string, (e: IInputEvent) => void] => {
    const [input, setInput] = useState(initialValue);

    const onChange = (e: IInputEvent) => {
        setInput(e.target.value);
    };

    return [input, onChange];
};
