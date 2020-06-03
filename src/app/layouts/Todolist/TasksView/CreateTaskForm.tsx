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
    return (
        <div className='create-task-form'>
            <CustomizableSimpleInput
                value={inputValue}
                className='create-task-form__input'
                placeholder='Enter a title for this task'
                onChange={setInputValue}
            />
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
