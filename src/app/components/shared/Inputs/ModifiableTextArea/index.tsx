import React from 'react';
import { useInput } from 'app/custom-hooks';

interface IProps {
    name: string;
    value: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className: string;
}

export const ModifiableTextArea: React.FC<IProps> = ({
    name,
    value,
    label,
    onChange,
    className,
}) => {
    const [inputValue, setInputValue] = useInput(value);

    const onLoseFocus = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e);
    };

    const displayContent = () => {
        return (
            <textarea
                className={`${className}__textarea`}
                name={name}
                value={inputValue}
                onChange={setInputValue}
                onBlur={onLoseFocus}
            />
        );
    };

    return (
        <div className={`${className}`}>
            <label className={`${className}__label label label-sm`}>
                {label}
            </label>
            {displayContent()}
        </div>
    );
};
