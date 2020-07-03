import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TeamInput } from 'app/components';
import { createTeam } from 'app/actions';

interface IProps {
    change: (value: boolean) => void;
}

export const CreateTeamForm: React.FC<IProps> = ({ change }) => {
    const [valueName, setValueName] = useState('');
    const [valueRegion, setValueRegion] = useState('');
    const [valueGame, setValueGame] = useState('');
    const dispatch = useDispatch();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTeam(valueName, valueRegion, valueGame));
        change(false);
    };
    // tslint:disable-next-line:no-any
    const handleChange = (value: any) => {
        setValueName(value.target.value);
    };

    return (
        <div className='create-team-form'>
            <h1 className='create-team-form__title'> Create your team</h1>
            <form onSubmit={onSubmit}>
                <div className='create-team-form__container'>
                    <div className='create-team-form__label--team-name'>
                        <label className='create-team-form__label'>
                            {'Team name'} <br />
                            <br />
                            <input
                                className={'create-team-form__input__team-name'}
                                type='text'
                                value={valueName}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className='create-team-form__label--region-name'>
                        <TeamInput
                            setTeamForm={setValueRegion}
                            valueForm={valueRegion}
                            textLabel={'Country'}
                            className={'create-team-form__input'}
                        />
                    </div>
                    <div className='create-team-form__label--game-name'>
                        <TeamInput
                            setTeamForm={setValueGame}
                            valueForm={valueGame}
                            textLabel={'Game Name'}
                            className={'create-team-form__input'}
                        />
                    </div>
                </div>
                <div className='create-team-form__label--close-sudmit'>
                    <div
                        className='create-team-form__close-btn'
                        onClick={() => change(false)}
                    >
                        Back
                    </div>
                    <button
                        className='create-team-form__sudmit-btn'
                        type='submit'
                        value='Submit'
                    >
                        Create !
                    </button>
                </div>
            </form>
        </div>
    );
};
