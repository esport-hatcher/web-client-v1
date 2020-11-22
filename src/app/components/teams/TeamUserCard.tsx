import React from 'react';
import { IUser, invitePlayer } from 'app/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

interface IProps {
    item: IUser;
}

export const TeamUserCard: React.FC<IProps> = ({ item }) => {
    const dispatch = useDispatch();
    const validateTeamUser = (userid: number, teamId: number) => {
        dispatch(invitePlayer(userid, teamId));
    };

    return (
        <div className='team-user-card'>
            <div className='membername'>
                <h1 className='name'>{item.username}</h1>
            </div>
            <div className='status'>
                <span
                    className='spot'
                    style={{ backgroundColor: 'red' }}
                ></span>
            </div>
            {item.TeamUser ? (
                <div>
                    <span>{item.TeamUser.role}</span>
                    <span> Member since : {item.TeamUser.createdAt}</span>
                </div>
            ) : (
                ' '
            )}
            {item.TeamUser && !item.TeamUser.teamStatus ? (
                <button
                    onClick={() =>
                        validateTeamUser(item.id, item.TeamUser.TeamId)
                    }
                >
                    {' '}
                    validation requise
                </button>
            ) : (
                ' '
            )}
        </div>
    );
};
