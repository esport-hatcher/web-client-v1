import React from 'react';
import { Link } from 'react-router-dom';
import { ITeam } from 'app/actions';
import { FiClipboard, FiBell } from 'react-icons/fi';

interface IProps {
    item: ITeam;
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
            <FiClipboard className='select-team__box--action' />
            <FiBell className='select-team__box--action' />
        </Link>
    );
};
