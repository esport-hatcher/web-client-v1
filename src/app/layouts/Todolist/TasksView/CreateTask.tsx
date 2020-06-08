import React, { useState, useEffect } from 'react';
import {
    CustomizableSimpleInput,
    DatePickerButton,
    MiniCalendar,
} from 'app/components';
import { useToggler, useSelector } from 'app/custom-hooks';
import moment from 'moment';
import { sendToast } from 'app/shared';
import { useDispatch } from 'react-redux';
import { createTask, fetchTeams } from 'app/actions';

interface IProps {
    setShowCreateTask: Function;
}

export const CreateTask: React.FC<IProps> = React.memo(
    ({ setShowCreateTask }) => {
        const dispatch = useDispatch();
        const [inputValue, setInputValue] = useState('');
        const [showMiniCalendar, setShowMiniCalendar] = useToggler(false);
        const [date, setDate] = useState(moment().format('Y/M/D'));
        const teams = useSelector(state => state.teams);

        useEffect(() => {
            dispatch(fetchTeams());
        }, [dispatch]);

        const handleClick = (action: string) => {
            if (action === 'create' && inputValue.trim() === '') {
                sendToast({
                    title: 'No title',
                    content: 'Cannot create a task without title',
                    type: 'error',
                });
            } else if (action === 'cancel') {
                setShowCreateTask(false);
            } else {
                dispatch(
                    createTask(
                        { title: inputValue, deadline: date },
                        // Temporary way to get the team
                        teams[1].id
                    )
                );
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
                <DatePickerButton
                    onClick={setShowMiniCalendar}
                    isActive={showMiniCalendar}
                    date={date}
                    className={'create-task__form__input__date-picker'}
                    activeClassName={
                        'create-task__form__input__date-picker--active'
                    }
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
