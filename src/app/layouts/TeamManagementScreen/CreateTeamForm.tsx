import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SimpleImput, IconButton } from '@/components';
import { createTeam } from '@/actions';

interface IProps {
    change: Function;
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
    return (
        <form className='create-team-form-container' onSubmit={onSubmit}>
            <SimpleImput
                setTeamForm={setValueName}
                valueForm={valueName}
                textLabel={'Name of the Team'}
            />
            <SimpleImput
                setTeamForm={setValueRegion}
                valueForm={valueRegion}
                textLabel={'Region'}
            />
            <SimpleImput
                setTeamForm={setValueGame}
                valueForm={valueGame}
                textLabel={'Choose a Game'}
            />
            <label>
                <span> </span>
                <input type='submit' value='create the team' />
            </label>
        </form>
    );
};
