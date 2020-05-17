import React, { useEffect, useState } from 'react';
import { useSelector, useToggler } from 'app/custom-hooks';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchTeamUser } from 'app/actions';
import { TeamUserCard, Description, SearchField } from 'app/components';

export const _EditTeamPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const [inteam, setinteam] = useToggler(false);

    const { id } = useParams();

    const teams = useSelector(state => state.teams.team);
    const teamUser = useSelector(state => state.teams.teamUsers);
    const user = useSelector(state => state.authentication.user);

    const teamSelected = teams.find(element => {
        return element.name === id;
    });

    if (!teamSelected) {
        return <main></main>;
    }

    useEffect(() => {
        dispatch(fetchTeamUser(teamSelected.id));
    }, [dispatch]);

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
                </div>
            </div>
        </main>
    );
});
