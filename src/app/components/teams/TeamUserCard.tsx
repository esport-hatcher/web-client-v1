import React from 'react';
import { IUser, invitePlayer } from 'app/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';

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
                <div className='team-user-card__infos'>
                    <h4>{item.TeamUser.role}</h4>
                    <span className='team-user-card__date'>
                        {' '}
                        Member since :{' '}
                        {moment(item.TeamUser.createdAt).format('Y/M/D')}
                    </span>
                </div>
            ) : (
                ' '
            )}
            {item.TeamUser && !item.TeamUser.teamStatus ? (
                <button
                    className='team-user-card__button'
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
