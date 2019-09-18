import { useState } from 'react';

export const useToggler = (
    initialValue: boolean = false
): [boolean, () => void] => {
    const [value, setValue] = useState(initialValue);

    const onChange = () => setValue(!value);
    return [value, onChange];
};
