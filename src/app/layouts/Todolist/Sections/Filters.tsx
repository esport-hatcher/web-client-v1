import React from 'react';
import { TaskFilterByDate } from 'app/components';
import { FaRegCalendarAlt, FaCalendarDay, FaArchive } from 'react-icons/fa';
import { BsFillInboxesFill } from 'react-icons/bs';

export const Filters: React.FC = React.memo(() => {
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
            </div>
        </React.Fragment>
    );
});
