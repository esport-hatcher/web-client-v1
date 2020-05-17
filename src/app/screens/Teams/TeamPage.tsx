import React, { useEffect } from 'react';
import { CreateTeamForm, AddPlayerForm, ModalForm } from '@/layouts';
import { Icon, TeamCard, Plus } from '@/components';
import { useSelector, useToggler } from '@/custom-hooks';
import { useDispatch } from 'react-redux';
import { fetchTeams } from '@/actions';

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
                <Icon
                    className='select-team__modal--button__icon'
                    name='cross'
                />
            </div>
            <ModalForm show={show} handleClose={onShow}>
                <div className='col-1'>
                    <h1>Create your team</h1>
                    <CreateTeamForm change={onShow} />
                </div>
                {/* <div className='col-2'>
                    <h1>Select your player</h1>
                    <AddPlayerForm />
            </div>*/}
            </ModalForm>
        </main>
    );
});
