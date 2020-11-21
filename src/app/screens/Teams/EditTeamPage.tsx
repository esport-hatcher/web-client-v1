import React, { useEffect } from 'react';
import { useSelector, useToggler } from 'app/custom-hooks';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchTeamUser, joinTeam } from 'app/actions';
import { AddPlayerForm, ModalForm } from 'app/layouts';
import { TeamUserCard, TeamDescription } from 'app/components';
import PlusButton from 'app/components/teams/PlusButton';

declare global {
    interface HTMLIFrameElement {
        type?: string;
        // tslint:disable-next-line: no-any
        frameborder?: any;
    }
}

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

    const validateUserTeam = (teamid: string, userId: number) => {
        dispatch(joinTeam(teamid, 0));
    };

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
                    {teamUser.length > 0 ? (
                        <div>
                            {' '}
                            <iframe
                                src='https://player.twitch.tv/?channel=faker&parent=www.example.com'
                                scrolling='no'
                                height='378'
                                width='620'
                            ></iframe>
                        </div>
                    ) : null}
                </div>
                <div className='container-information__team-member'>
                    {teamUser.length <= 0 ? (
                        <button
                            onClick={() =>
                                validateUserTeam(teamSelected.name, 0)
                            }
                        >
                            {' '}
                            validation requise
                        </button>
                    ) : null}
                    {teamUser &&
                        user &&
                        teamUser.map(item => {
                            if (!item.TeamUser) {
                                return null;
                            } else if (item.TeamUser.teamStatus) {
                                return (
                                    <TeamUserCard
                                        item={item}
                                        needvalidation={false}
                                    />
                                );
                            } else {
                                return (
                                    <TeamUserCard
                                        item={item}
                                        needvalidation={true}
                                    />
                                );
                            }
                        })}
                    <div className='team-page__modal--button' onClick={onShow}>
                        {teamUser.length <= 0 ? null : <PlusButton />}
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
