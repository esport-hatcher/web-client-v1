import React, { useState } from 'react';
import {
    CustomizableSimpleInput,
    DatePicker,
    MiniCalendar,
} from 'app/components';
import { useToggler } from 'app/custom-hooks';
import moment from 'moment';
import { sendToast } from 'app/shared';

interface IProps {
    setShowCreateTask: Function;
}

export const CreateTask: React.FC<IProps> = React.memo(
    ({ setShowCreateTask }) => {
        const [inputValue, setInputValue] = useState('');
        const [showMiniCalendar, setShowMiniCalendar] = useToggler(false);
        const [date, setDate] = useState(moment().format('Y/M/D'));

        const handleClick = (action: string) => {
            if (action === 'create' && inputValue.trim() === '') {
                sendToast({
                    title: 'No title',
                    content: 'Cannot create a task without title',
                    type: 'error',
                });
            } else {
                setShowCreateTask(false);
            }
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
                    <div>
                        <button
                            onClick={() => handleClick('create')}
                            className='create-task__form__button-create'
                        >
                            Add Task
                        </button>
                        <button
                            onClick={() => handleClick('cancel')}
                            className='create-task__form__button-cancel'
                        >
                            Cancel
                        </button>
                    </div>
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
    }
);
