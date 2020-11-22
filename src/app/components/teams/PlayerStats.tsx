import React from 'react';
import { IUser } from 'app/actions';

interface IProps {
    item: IUser;
}

export const PlayerStats: React.FC<IProps> = ({ item }) => {
    return (
        <div className='stats__card'>
            <div className='membername'>
                <h1 className='name'>{item.username}</h1>
            </div>
            <div className='stats__card--container'>
                <div className='stats__bloc--one'>
                    <div>
                        <p className='stats__type--rank'>Rank tmp</p>
                    </div>
                    <div>
                        <p className='stats__type--winrate'>90%</p>
                    </div>
                </div>
                <p className='stats__type--mostplayed'>Darius</p>
                <p className='stats__type--history'>w w l l w</p>
            </div>
        </div>
    );
};
