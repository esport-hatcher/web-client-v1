import React, { useState } from 'react';
import { TaskFilterByDate } from 'app/components';
import { AiOutlineInbox } from 'react-icons/ai';

export const Filters: React.FC = React.memo(() => {
    const [inbox, setInbox] = useState(false);
    const [today, setToday] = useState(false);
    const [sevenDays, setSevenDays] = useState(false);

    const _setInbox = () => {
        setInbox(true);
        setToday(false);
        setSevenDays(false);
    };
    const _setToday = () => {
        setToday(true);
        setInbox(false);
        setSevenDays(false);
    };
    const _setSevenDays = () => {
        setSevenDays(true);
        setInbox(false);
        setToday(false);
    };

    return (
        <div className='todolist-screen__sections'>
            <TaskFilterByDate
                name='Inbox'
                Icon={AiOutlineInbox}
                iconColor='blue'
                active={inbox}
                onClick={_setInbox}
            />
            <TaskFilterByDate
                name='Today'
                Icon={AiOutlineInbox}
                iconColor='yellow'
                active={today}
                onClick={_setToday}
            />
            <TaskFilterByDate
                name='Next 7 days'
                Icon={AiOutlineInbox}
                iconColor='red'
                active={sevenDays}
                onClick={_setSevenDays}
            />
        </div>
    );
});
