import React from 'react';

interface IProps {
    setTeamForm: Function;
    valueForm: string;
    textLabel: string;
    className: string;
}

export const TeamInput: React.FC<IProps> = ({
    setTeamForm,
    valueForm,
    textLabel,
    className,
}) => {
    // tslint:disable-next-line:no-any
    const handleChange = (value: any) => {
        setTeamForm(value.target.value);
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
