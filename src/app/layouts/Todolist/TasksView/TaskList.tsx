import React from 'react';

interface IProps {
    section: string;
}

export const TaskList: React.FC<IProps> = React.memo(({ section }) => {
    return <div className='task-list'>{section}</div>;
});
