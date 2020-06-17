import React, { useEffect } from 'react';
import { useSelector, useToggler } from 'app/custom-hooks';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchTeamUser } from 'app/actions';
import { AddPlayerForm, ModalForm } from 'app/layouts';
import { TeamUserCard, Description, SearchField } from 'app/components';
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
        <main className='select-team'>
            <header className='header-title'>{teamSelected.name}</header>
            <div className='container-information'>
                <div className='container-information__team-information'>
                    <Description />
                </div>
                <div className='container-information__team-menber'>
                    <SearchField />
                    {teamUser &&
                        user &&
                        teamUser.map(item => {
                            if (inteam == true) {
                                if (item.id == user.id) {
                                    return null;
                                }
                                return (
                                    <TeamUserCard
                                        item={item}
                                        change={setinteam}
                                    />
                                );
                            }
                            return (
                                <TeamUserCard item={item} change={setinteam} />
                            );
                        })}
                    <div
                        className='select-team__modal--button'
                        onClick={onShow}
                    >
                        <AiOutlinePlus className='select-team__modal--button__icon' />
                    </div>
                </div>
            </div>
            <ModalForm show={show} handleClose={onShow}>
                <div className='col-2'>
                    <h1>Select your player</h1>
                    <AddPlayerForm change={onShow} teamId={teamSelected.id} />
                </div>
            </ModalForm>
        </main>
    );
});
