import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SmartSelect } from 'app/components';
import { createTeam } from 'app/actions';

interface IProps {
    change: (value: boolean) => void;
}

export const JoinTeamForm: React.FC<IProps> = ({ change }) => {
    const [valueName, setValueName] = useState('');
    const [valueRegion, setValueRegion] = useState('');
    const [valuePlayer, setPlayerSelected] = useState([{ value: Number }]);
    const [valueGame, setValueGame] = useState('');
    const dispatch = useDispatch();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTeam(valueName, valueRegion, valueGame));
        change(false);
    };
    const smartSelectProps = {
        setPlayerSelected: setPlayerSelected,
    };
    // tslint:disable-next-line:no-any
    const handleChange = (value: any) => {
        setValueName(value.target.value);
    };

    return (
        <div className='join-team-form'>
            <div>
                <h1 className='join-team-form__title'> Join a Team</h1>
            </div>
            <div>
                <form onSubmit={onSubmit}>
                    {/* <SmartSelect {...smartSelectProps} /> */}\
                    <div className='join-team-form__container'>
                        <div className='join-team-form__label--team-name'>
                            <label className='join-team-form__label'>
                                {'Enter an invitation or a team name'} <br />
                                <br />
                                <input
                                    className={
                                        'join-team-form__input__team-name'
                                    }
                                    type='text'
                                    value={valueName}
                                    onChange={handleChange}
                                    placeholder='Here'
                                />
                            </label>
                        </div>
                    </div>
                    <div className='join-team-form__label--close-sudmit'>
                        <div
                            className='join-team-form__close-btn'
                            onClick={() => change(false)}
                        >
                            Back
                        </div>
                        <button
                            className='join-team-form__submit-btn'
                            type='submit'
                            value='Submit'
                        >
                            Join !
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
