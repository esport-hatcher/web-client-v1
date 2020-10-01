import React from 'react';
import { IUser, pathTeamUser } from 'app/actions';
import { useDispatch } from 'react-redux';

interface IProps {
    item: IUser;
    needvalidation: boolean;
}

export const TeamUserCard: React.FC<IProps> = ({ item, needvalidation }) => {
    const dispatch = useDispatch();
    const validateTeamUser = (teamId: number) => {
        dispatch(pathTeamUser(teamId));
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
                        onClick={() => validateTeamUser(item.TeamUser.TeamId)}
                    >
                        {' '}
                        validation requise
                    </button>
                ) : (
                    ''
                )}
                <span>{item.TeamUser.role}</span>
            </div>
        </div>
    );
};
