import React from 'react';
import { Icon } from 'app/components';
import { Link } from 'react-router-dom';
import { ITeams } from 'app/actions';

interface IProps {
    item: ITeams;
}

export const TeamCard: React.FC<IProps> = ({ item }) => {
    return (
        <Link to={`team/${item.name}`} className='select-team__box'>
            <div
                className='select-team__box--image'
                style={{
                    backgroundImage: `url(${item.bannerUrl})`,
                }}
            >
                {''}
            </div>
            <div className='select-team__box--title'>{item.name}</div>
            <Icon className='select-team__box--action' name={'clipboard'} />
            <Icon className='select-team__box--action' name={'bell'} />
        </Link>
    );
};
