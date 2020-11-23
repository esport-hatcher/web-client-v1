import React from 'react';
import { useSelector } from 'app/custom-hooks';

declare global {
    interface HTMLIFrameElement {
        type?: string;
        // tslint:disable-next-line: no-any
        frameborder?: any;
    }
}

export const TeamTwitch: React.FC = React.memo(() => {
    const teamUser = useSelector(state => state.teams.teamUsers);

    return (
        <div className='team-twitch'>
            {teamUser &&
                teamUser.map(item => {
                    if (item.twitchUsername) {
                        return (
                            <div>
                                <span>stream de {item.twitchUsername}</span>
                                <iframe
                                    src={`https://player.twitch.tv/?channel=${item.twitchUsername}&parent=${window.location.hostname}`}
                                    scrolling='no'
                                    height='378'
                                    width='620'
                                ></iframe>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
        </div>
    );
});
