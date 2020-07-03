import React from 'react';
import { Link } from 'react-router-dom';
import { ITeams } from 'app/actions';
import { FiClipboard, FiBell } from 'react-icons/fi';

interface IProps {
    item: ITeams;
}

export const TeamCard: React.FC<IProps> = ({ item }) => {
    return (
        <Link to={`teams/${item.name}`} className='team-card__box'>
            <div
                className='team-card__box--image'
                style={{
                    backgroundImage: `url(${item.bannerUrl})`,
                }}
            >
                {''}
            </div>
            <div className='team-card__box--title'>{item.name}</div>
            <FiClipboard className='team-card__box--action' />
            <FiBell className='team-card__box--action' />
        </Link>
    );
};
