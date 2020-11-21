import React from 'react';
import { IUser, joinTeam, invitePlayer } from 'app/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

interface IProps {
    item: IUser;
    needvalidation: boolean;
}

export const TeamUserCard: React.FC<IProps> = ({ item, needvalidation }) => {
    const { id } = useParams();
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
                {needvalidation == true ? (
                    <button
                        onClick={() =>
                            validateTeamUser(item.id, item.TeamUser.TeamId)
                        }
                    >
                        {' '}
                        validation requise
                    </button>
                ) : (
                    ''
                )}
                {item.TeamUser ? <span>{item.TeamUser.role}</span> : ' '}
            </div>
        </div>
    );
};
