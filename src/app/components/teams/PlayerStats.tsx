import React, { useEffect, useState } from 'react';
import { IUser } from 'app/actions';
import darius from 'assets/darius.jpg';
import jinx from 'assets/jinx.jpg';
import garen from 'assets/Garen.jpg';
import leesin from 'assets/lee sin.jpg';
import wukong from 'assets/Wukong.jpg';

interface IProps {
    item: any;
}

export const PlayerStats: React.FC<IProps> = ({ item }) => {
    return (
        <div className='stats__card'>
            <div className='membername'>
                <h1 className='name'>{item.user.username}</h1>
            </div>
            <div className='stats__card--container'>
                <div className='stats__card--bloc'>
                    <h3>Solo/ Duo</h3>
                    <div className='stats__boxone'>
                        <div>
                            <p className='stats__type--rank'>Rank:</p>
                        </div>
                        <div>
                            <p className='stats__type--winrate'>
                                Win rate: 90%
                            </p>
                        </div>
                    </div>
                    <div className='stats__boxtwo'>
                        <p className='stats__type--mostplayed'>
                            Most played heroes:
                        </p>
                        <div className='stats__boxtwo--heroes'>
                            {item.bestMasteryChampions.map((champion: any) => {
                                return (
                                    <div className='stats__boxtwo--heroe'>
                                        <img
                                            src={champion.imageUrl}
                                            alt={champion.championName}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='stats__card--bloc'>
                    <h3>Flex</h3>
                    <div className='stats__boxone'>
                        <div>
                            <p className='stats__type--rank'>Rank:</p>
                        </div>
                        <div>
                            <p className='stats__type--winrate'>
                                Win rate: 90%
                            </p>
                        </div>
                    </div>
                    <div className='stats__boxtwo'>
                        <p className='stats__type--mostplayed'>
                            Most played heroes:
                        </p>
                        <div className='stats__boxtwo--heroes'>
                            {item.bestMasteryChampions.map((champion: any) => {
                                return (
                                    <div className='stats__boxtwo--heroe'>
                                        <img
                                            src={champion.imageUrl}
                                            alt={champion.championName}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
