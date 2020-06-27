import React, { useEffect } from 'react';
import { useSelector, useToggler } from 'app/custom-hooks';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchTeamUser } from 'app/actions';
import { AddPlayerForm, ModalForm } from 'app/layouts';
import { TeamUserCard, TeamDescription } from 'app/components';
import { AiOutlinePlus } from 'react-icons/ai';

export const _EditTeamPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const [inteam, setinteam] = useToggler(false);
    const [show, onShow] = useToggler(false);

    const { id } = useParams();

    const teams = useSelector(state => state.teams.team);
    const teamUser = useSelector(state => state.teams.teamUsers);
    const user = useSelector(state => state.authentication.user);
    const teamSelected = teams.find(element => {
        return element.name === id;
    });

    useEffect(() => {
        if (teamSelected) {
            dispatch(fetchTeamUser(teamSelected.id));
        }
    }, [dispatch]);

    if (!teamSelected) {
        return null;
    }

    return (
        <main className='team-page'>
            <header className='header-title'>{teamSelected.name}</header>
            <div className='container-information'>
                <div className='container-information__team-information'>
                    <TeamDescription />
                </div>
                <div className='container-information__team-menber'>
                    {teamUser &&
                        user &&
                        teamUser.map(item => {
                            if (inteam == true) {
                                if (item.id == user.id) {
                                    return null;
                                }
                                return <TeamUserCard item={item} />;
                            }
                            return <TeamUserCard item={item} />;
                        })}
                    <div className='team-page__modal--button' onClick={onShow}>
                        <AiOutlinePlus className='team-page__modal--button__icon' />
                    </div>
                </div>
            </div>
            <ModalForm show={show} handleClose={onShow}>
                <div className='team-page__modal--form'>
                    <h1>Select your player</h1>
                    <AddPlayerForm change={onShow} teamId={teamSelected.id} />
                </div>
            </ModalForm>
        </main>
    );
});
