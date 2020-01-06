import { useState, useCallback } from 'react';

export const useToggler = (
    initialValue: boolean = false
): [boolean, () => void, (newValue: boolean) => void] => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(() => setValue(value => !value), [setValue]);
    const onChangeAlt = useCallback((newValue: boolean) => setValue(newValue), [
        setValue,
    ]);
    return [value, onChange, onChangeAlt];
};
