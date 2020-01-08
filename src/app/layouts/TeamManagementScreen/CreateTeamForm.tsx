import React, { useState } from 'react';
import { SimpleImput } from '@/components';
import api from '@/api';

export const CreateTeamForm: React.FC = React.memo(() => {
    const [valueName, setValueName] = useState('');
    const [valueRegion, setValueRegion] = useState('');
    const [valueGame, setValueGame] = useState('');

    /**
     * TODO: NO API CALL IN COMPONENT
     */
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const info = localStorage.getItem('ehToken');
        if (info === null) {
            return null;
        }
        const obj = JSON.parse(info);
        try {
            await api.post('/teams', {
                body: { name: valueName, game: valueGame, region: valueRegion },
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                },
            });
            return 200;
        } catch {
            return null;
        }
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
});
