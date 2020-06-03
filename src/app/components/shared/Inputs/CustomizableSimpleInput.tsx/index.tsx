import React from 'react';

interface IProps {
    value: string;
    className: string;
    placeholder: string;
    onChange: Function;
}

export const CustomizableSimpleInput: React.FC<IProps> = React.memo(
    ({ value, className, placeholder, onChange }) => {
        const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
            onChange(value.target.value);
        };
        return (
            <input
                className={className}
                type='text'
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
        );
    }
);
