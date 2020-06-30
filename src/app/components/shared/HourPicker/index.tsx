import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { FormInput } from '../Inputs';

interface IProps extends ReactDatePickerProps {
    inputClassName?: string;
}

export const HourPicker: React.FC<IProps> = React.memo(
    ({ inputClassName, ...reactDatePickerProps }) => {
        return (
            <ReactDatePicker
                {...reactDatePickerProps}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeFormat='HH:mm'
                dateFormat='HH:mm'
                customInput={
                    <FormInput noIcon noCaret inputClassName={inputClassName} />
                }
                portalId='root-portal'
            />
        );
    }
);
