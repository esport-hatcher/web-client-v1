import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateTeamForm, AddPlayerForm, ModalForm } from 'app/layouts';
import { TeamCard } from 'app/components';
import { useSelector, useToggler } from 'app/custom-hooks';
import { fetchTeams } from 'app/actions';

export const _TeamPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const team = useSelector(state => state.teams.team);

    const [show, onShow] = useToggler(false);

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    return (
        <main className='select-team'>
            {team &&
                team.map(item => {
                    return <TeamCard item={item} />;
                })}
            <div className='select-team__modal--button' onClick={onShow}>
                <FontAwesomeIcon
                    className='select-team__modal--button__icon'
                    icon='plus-circle'
                />
            </div>
            <ModalForm show={show} handleClose={onShow}>
                <div className='col-1'>
                    <h1>Create your team</h1>
                    <CreateTeamForm />
                </div>
                <div className='col-2'>
                    <h1>Select your player</h1>
                    <AddPlayerForm />
                </div>
            </ModalForm>
        </main>
    );
});
