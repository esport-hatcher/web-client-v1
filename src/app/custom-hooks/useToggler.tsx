import { useState, useCallback } from 'react';

export const useToggler = (
    initialValue: boolean = false
): [boolean, () => void] => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(() => setValue(value => !value), [setValue]);
    return [value, onChange];
};
