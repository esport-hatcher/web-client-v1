import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { FormInput } from '../FormInput';

export const NumberInput: React.FC<NumberFormatProps> = React.memo(props => {
    return <NumberFormat customInput={FormInput} {...props} />;
});
