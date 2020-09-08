import React from 'react';
import { ValueContainerProps } from 'react-select';

// tslint:disable: no-any
export const DropdownValueContainer: React.FC<ValueContainerProps<any>> = ({
    children,
    className,
}) => (
    <div className={'dropdown__value-container ' + className}>{children}</div>
);
