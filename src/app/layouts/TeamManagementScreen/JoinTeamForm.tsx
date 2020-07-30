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
        <div className='create-team-form'>
            <h1 className='create-team-form__title'> Join a Team</h1>
            <form onSubmit={onSubmit}>
                <SmartSelect {...smartSelectProps} />
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
                        Join !
                    </button>
                </div>
            </form>
        </div>
    );
};
