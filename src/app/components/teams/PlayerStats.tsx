import React from 'react';

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
                                        <span className='stats__boxtwo--tooltip'>
                                            Name : {champion.championName}{' '}
                                            <br />
                                            level: {champion.championLevel}{' '}
                                            <br />
                                            points: {champion.championPoints}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='stats__card--bloc'>
                    <h3>Solo/ Duo</h3>
                    <div className='stats__boxone'>
                        <div>
                            <p className='stats__type--rank'>
                                Rank: {item.rankedInfos[0].tier}{' '}
                                {item.rankedInfos[0].rank}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--winrate'>
                                Win rate: {item.rankedInfos[0].winrate}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--winrate'>
                                Win rate: {item.advancedStats.kda}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--kills'>
                                Kills: {item.advancedStats.kills}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--deaths'>
                                Deaths: {item.advancedStats.deaths}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--assists'>
                                Assists: {item.advancedStats.assists}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--kills'>
                                Damages: {item.advancedStats.totalDamageDealt}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--deaths'>
                                Vision score: {item.advancedStats.visionScore}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--assists'>
                                Last hit/ min: {item.advancedStats.csPerMinutes}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='stats__card--bloc'>
                    <h3>Flex</h3>
                    <div className='stats__boxone'>
                        <div>
                            <p className='stats__type--rank'>
                                Rank: {item.rankedInfos[1].tier}{' '}
                                {item.rankedInfos[1].rank}
                            </p>
                        </div>
                        <div>
                            <p className='stats__type--winrate'>
                                Win rate: {item.rankedInfos[1].winrate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
