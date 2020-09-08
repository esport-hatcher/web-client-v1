import React from 'react';
import { TaskFilterByDate, Dropdown } from 'app/components';
import { FaRegCalendarAlt, FaCalendarDay, FaArchive } from 'react-icons/fa';
import { BsFillInboxesFill } from 'react-icons/bs';
import { ITeam } from 'app/actions';

interface IProps {
    teams: ITeam[];
    setSelectedTeam: Function;
}

export const Filters: React.FC<IProps> = React.memo(
    ({ teams, setSelectedTeam }) => {
        const teamList = ['Personal'].concat(teams.map(team => team.name));
        const onSelect = (selectedTeamName: string) => {
            const teamSelected = teams.find(team => {
                return team.name === selectedTeamName;
            });
            setSelectedTeam(teamSelected);
        };

        return (
            <React.Fragment>
                <div className='task-section'>
                    <TaskFilterByDate
                        name='Inbox'
                        Icon={BsFillInboxesFill}
                        iconColor='blue'
                        path='?filter=inbox'
                    />
                    <TaskFilterByDate
                        name='Today'
                        Icon={FaCalendarDay}
                        iconColor='yellow'
                        path='?filter=today'
                    />
                    <TaskFilterByDate
                        name='Next 7 days'
                        Icon={FaRegCalendarAlt}
                        iconColor='red'
                        path='?filter=sevendays'
                    />
                    <TaskFilterByDate
                        name='Archive'
                        Icon={FaArchive}
                        iconColor='grey'
                        path='?filter=archive'
                    />
                    <div className='task-section__team'>
                        <Dropdown items={teamList} onSelect={onSelect} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
);
