import React, { useState } from 'react';
import {
    CustomizableSimpleInput,
    DatePicker,
    MiniCalendar,
} from 'app/components';
import { useToggler } from 'app/custom-hooks';
import moment from 'moment';

interface IProps {}

export const CreateTaskForm: React.FC<IProps> = React.memo(() => {
    const [inputValue, setInputValue] = useState('');
    const [showMiniCalendar, setShowMiniCalendar] = useToggler(false);
    const [date, setDate] = useState(moment().format('Y/M/D'));

    const handleClick = () => {
        // console.log('boo create task');
    };
    return (
        <div className='create-task'>
            <div className='create-task__form'>
                <CustomizableSimpleInput
                    value={inputValue}
                    className='create-task__form__input'
                    placeholder='Enter a title for this task'
                    onChange={setInputValue}
                />
                <button
                    onClick={handleClick}
                    className='create-task__form__button'
                >
                    Add Task
                </button>
            </div>
            <DatePicker
                onClick={setShowMiniCalendar}
                isActive={showMiniCalendar}
                date={date}
            />
            {showMiniCalendar && (
                <MiniCalendar
                    setShowMiniCalendar={setShowMiniCalendar}
                    setDate={setDate}
                />
            )}
        </div>
    );
});
