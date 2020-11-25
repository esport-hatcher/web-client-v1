import React from 'react';
import { ControlProps } from 'react-select';

// tslint:disable-next-line: no-any
export const DropdownControl: React.FC<ControlProps<any>> = ({
    innerRef,
    innerProps,
    children,
    className,
}) => (
    <div
        {...innerProps}
        className={'dropdown__control ' + className}
        ref={innerRef}
    >
        {children}
    </div>
);
