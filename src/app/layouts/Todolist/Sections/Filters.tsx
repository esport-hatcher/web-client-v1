import React from 'react';
import { TaskFilterByDate } from 'app/components';
import { AiOutlineInbox } from 'react-icons/ai';

export const Filters: React.FC = React.memo(() => {
    return (
        <React.Fragment>
            <div className='task-section'>
                <TaskFilterByDate
                    name='Inbox'
                    Icon={AiOutlineInbox}
                    iconColor='blue'
                    path='?filter=inbox'
                />
                <TaskFilterByDate
                    name='Today'
                    Icon={AiOutlineInbox}
                    iconColor='yellow'
                    path='?filter=today'
                />
                <TaskFilterByDate
                    name='Next 7 days'
                    Icon={AiOutlineInbox}
                    iconColor='red'
                    path='?filter=sevendays'
                />
            </div>
        </React.Fragment>
    );
});
