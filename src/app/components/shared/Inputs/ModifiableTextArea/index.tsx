import React from 'react';
import { useInput } from 'app/custom-hooks';

interface IProps {
    name: string;
    value: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ModifiableTextArea: React.FC<IProps> = ({
    name,
    value,
    label,
    onChange,
}) => {
    const [inputValue, setInputValue] = useInput(value);

    const onLoseFocus = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e);
    };

    const displayContent = () => {
        return (
            <textarea
                className='task-description-input__textarea'
                name={name}
                value={inputValue}
                onChange={setInputValue}
                onBlur={onLoseFocus}
            />
        );
    };

    return (
        <div className='task-description-input'>
            <label className='task-description-input__label label label-sm'>
                {label}
            </label>
            {displayContent()}
        </div>
    );
};
