import React from 'react';
import { Link } from 'react-router-dom';
import { ITeams } from 'app/actions';
import { FiClipboard, FiBell } from 'react-icons/fi';

interface IProps {
    item: ITeams;
}

export const TeamCard: React.FC<IProps> = ({ item }) => {
    return (
        <Link to={`team/${item.name}`} className='team-page__box'>
            <div
                className='team-page__box--image'
                style={{
                    backgroundImage: `url(${item.bannerUrl})`,
                }}
            >
                {''}
            </div>
            <div className='team-page__box--title'>{item.name}</div>
            <FiClipboard className='team-page__box--action' />
            <FiBell className='team-page__box--action' />
        </Link>
    );
};
