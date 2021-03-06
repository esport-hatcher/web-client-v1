import React, { useState, useCallback } from 'react';
import { DatePickerButton, MiniCalendar } from 'app/components';
import { useToggler } from 'app/custom-hooks';
import moment from 'moment';
import { sendToast } from 'app/shared';
import { useDispatch } from 'react-redux';
import { createTask } from 'app/actions';

interface IProps {
    setShowCreateTask: Function;
    selectedTeam: number;
}

export const CreateTask: React.FC<IProps> = React.memo(
    ({ setShowCreateTask, selectedTeam }) => {
        const dispatch = useDispatch();
        const [inputValue, setInputValue] = useState('');
        const [showMiniCalendar, setShowMiniCalendar] = useToggler(false);
        const [date, setDate] = useState(moment().format('Y/M/D'));

        const handleForm = useCallback(
            (action: string) => {
                if (action === 'create' && inputValue.trim().length === 0) {
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
                            { title: inputValue, dateEnd: date },
                            selectedTeam
                        )
                    );
                    setShowCreateTask(false);
                }
            },
            [inputValue, setShowCreateTask, date, selectedTeam, dispatch]
        );

        const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(value.target.value);
        };

        return (
            <form className='create-task' onSubmit={() => handleForm('create')}>
                <div className='create-task__form'>
                    <input
                        value={inputValue}
                        type='text'
                        className='create-task__form__input'
                        placeholder='Enter a title for this task'
                        onChange={handleChange}
                    />
                    <div>
                        <input
                            type='submit'
                            className='create-task__form__button-create'
                            value='Add Task'
                        />
                        <input
                            type='button'
                            onClick={() => handleForm('cancel')}
                            className='create-task__form__button-cancel'
                            value='Cancel'
                        />
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
            </form>
        );
    }
);
