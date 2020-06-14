import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CreateTeamForm, AddPlayerForm, ModalForm } from 'app/layouts';
import { TeamCard } from 'app/components';
import { useSelector, useToggler } from 'app/custom-hooks';
import { fetchTeams } from 'app/actions';
import { AiOutlinePlus } from 'react-icons/ai';

export const _TeamPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams.team);

    const [show, onShow] = useToggler(false);
    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    return (
        <main className='select-team'>
            {teams &&
                teams.map(item => {
                    return <TeamCard item={item} />;
                })}
            <div className='select-team__modal--button' onClick={onShow}>
                <AiOutlinePlus className='select-team__modal--button__icon' />
            </div>
            <ModalForm show={show} handleClose={onShow}>
                <div className='col-1'>
                    <h1>Create your team</h1>
                    <CreateTeamForm change={onShow} />
                </div>
            </ModalForm>
        </main>
    );
});
