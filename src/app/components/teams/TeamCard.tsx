import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <FontAwesomeIcon
                className='select-team__box--action'
                icon='clipboard'
            />
            <FontAwesomeIcon className='select-team__box--action' icon='bell' />
        </Link>
    );
};
