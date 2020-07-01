import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { BsCalendar } from 'react-icons/bs';
import { FormInput } from '../Inputs';
import { CalendarHeader } from 'app/layouts';

interface IProps extends ReactDatePickerProps {
    inputClassName?: string;
}

export const DatePicker: React.FC<IProps> = React.memo(
    ({ inputClassName, ...reactDatePickerProps }) => {
        return (
            <ReactDatePicker
                {...reactDatePickerProps}
                customInput={
                    <FormInput
                        inputClassName={inputClassName}
                        Icon={BsCalendar}
                        iconStaysOnFocus
                        noCaret
                    />
                }
                renderCustomHeader={({
                    decreaseMonth,
                    increaseMonth,
                    date,
                }) => (
                    <CalendarHeader
                        date={date}
                        increaseMonth={increaseMonth}
                        decreaseMonth={decreaseMonth}
                        className='date-picker__header'
                    />
                )}
                popperPlacement='bottom-start'
                portalId='root-portal'
                showPopperArrow={true}
            />
        );
    }
);
