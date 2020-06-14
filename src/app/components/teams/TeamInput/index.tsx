import React from 'react';

interface IProps {
    setTeamForm: Function;
    valueForm: string;
    textLabel: string;
}

export const TeamInput: React.FC<IProps> = ({
    setTeamForm,
    valueForm,
    textLabel,
}) => {
    // tslint:disable-next-line:no-any
    const handleChange = (value: any) => {
        setTeamForm(value.target.value);
    };
    return (
        <label className='create-team-form-label'>
            {textLabel}
            <dd />
            <input
                className='create-team-form-input'
                type='text'
                value={valueForm}
                onChange={handleChange}
            />
        </label>
    );
};
