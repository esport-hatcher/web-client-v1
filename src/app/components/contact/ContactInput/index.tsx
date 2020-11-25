import React from 'react';

interface IProps {
    setContactForm: Function;
    valueForm: string;
    textLabel: string;
    className: string;
}

export const ContactInput: React.FC<IProps> = ({
    setContactForm,
    valueForm,
    textLabel,
    className,
}) => {
    // tslint:disable-next-line:no-any
    const handleChange = (value: any) => {
        setContactForm(value.target.value);
    };
    return (
        <label className='create-team-form__label'>
            {textLabel}
            <br />
            <br />
            <input
                className={className}
                type='text'
                value={valueForm}
                onChange={handleChange}
            />
        </label>
    );
};
