import React, { useCallback, useEffect, useState } from 'react';
import { FaRegCalendarAlt, FaCalendarDay, FaArchive } from 'react-icons/fa';
import { BsFillInboxesFill } from 'react-icons/bs';
import { ITeam } from 'app/actions';
import { OptionsType, ValueType } from 'react-select';
import unionBy from 'lodash/unionBy';

import { TaskFilterByDate, Dropdown, IOption } from 'app/components';

interface IProps {
    teams: ITeam[];
    setSelectedTeam: Function;
}

export const Filters: React.FC<IProps> = React.memo(
    ({ teams, setSelectedTeam }) => {
        const [options, setOptions] = useState<OptionsType<IOption>>([
            { value: '0', label: 'Personal' },
        ]);

        useEffect(() => {
            setOptions(currentOptions =>
                unionBy(
                    currentOptions,
                    teams.map(team => ({
                        value: team.id.toString(),
                        label: team.name,
                    })),
                    'value'
                )
            );
        }, [teams]);

        const onOptionChange = useCallback(
            (value: ValueType<IOption>) => {
                if (value) {
                    setSelectedTeam(parseInt((value as IOption).value));
                }
            },
            [setSelectedTeam]
        );

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
                        <Dropdown
                            options={options}
                            name='entity'
                            defaultValue={options[0]}
                            className='task-section__team-dropdown'
                            onChange={onOptionChange}
                        />{' '}
                    </div>
                </div>
            </React.Fragment>
        );
    }
);
