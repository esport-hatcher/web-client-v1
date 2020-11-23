import React, { useEffect, useState } from 'react';
import { color_blue_light, color_dark_medium } from 'app/config';

interface IProps {
    label: string;
    onChange: (value: boolean) => void;
    checkboxColor?: string;
    defaultChecked?: boolean;
}

export const Checkbox: React.FC<IProps> = React.memo(
    ({
        label,
        onChange,
        checkboxColor = color_blue_light,
        defaultChecked = false,
    }) => {
        const [checked, setChecked] = useState(defaultChecked);

        useEffect(() => onChange(checked), [checked, onChange]);

        const onClick = React.useCallback(
            () => setChecked(currentValue => !currentValue),
            [setChecked]
        );

        return (
            <div className='checkbox' onClick={onClick}>
                <input
                    type='checkbox'
                    className='checkbox__input'
                    checked={checked}
                />
                <span
                    className='checkbox__checkmark'
                    style={
                        checked
                            ? { backgroundColor: checkboxColor }
                            : { backgroundColor: color_dark_medium }
                    }
                ></span>
                <span className='checkbox__label body-text body-text--sm'>
                    {label}
                </span>
            </div>
        );
    }
);
