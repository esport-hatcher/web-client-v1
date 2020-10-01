import React, { useEffect } from 'react';
import { useSelector, useToggler } from 'app/custom-hooks';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchTeamUser } from 'app/actions';
import { AddPlayerForm, ModalForm } from 'app/layouts';
import { TeamUserCard, TeamDescription } from 'app/components';
import PlusButton from 'app/components/teams/PlusButton';

export const _EditTeamPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const [inTeam] = useToggler(false);
    const [show, onShow] = useToggler(false);

    const { id } = useParams();

    const teams = useSelector(state => state.teams.teams);
    const teamUser = useSelector(state => state.teams.teamUsers);
    const user = useSelector(state => state.authentication.user);
    const teamSelected = teams.find(element => {
        return element.name === id;
    });

    useEffect(() => {
        if (teamSelected) {
            dispatch(fetchTeamUser(teamSelected.id));
        }
    }, [dispatch, teamSelected]);

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
                <div className='container-information__team-member'>
                    {teamUser &&
                        user &&
                        teamUser.map(item => {
                            if (
                                item.TeamUser.teamStatus &&
                                item.TeamUser.playerStatus
                            ) {
                                return (
                                    <TeamUserCard
                                        item={item}
                                        needvalidation={true}
                                    />
                                );
                            } else {
                                return (
                                    <TeamUserCard
                                        item={item}
                                        needvalidation={false}
                                    />
                                );
                            }
                        })}
                    <div className='team-page__modal--button' onClick={onShow}>
                        <PlusButton />
                    </div>
                </div>
            </div>
            <ModalForm show={show} handleClose={onShow}>
                <div className='team-page__modal--form'>
                    <div className='team-page__modal--title'>
                        <h1>Select your player</h1>
                    </div>
                    <div className='team-page__modal--input'>
                        <AddPlayerForm
                            change={onShow}
                            teamId={teamSelected.id}
                        />
                    </div>
                </div>
            </ModalForm>
        </main>
    );
});
