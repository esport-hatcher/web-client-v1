import React from 'react';
import { IUser } from 'app/actions';

interface IProps {
    item: IUser;
}

export const TeamUserCard: React.FC<IProps> = ({ item }) => {
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
        </div>
    );
};
