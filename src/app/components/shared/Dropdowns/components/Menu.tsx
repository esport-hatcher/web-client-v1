import React from 'react';
import { MenuProps } from 'react-select';

// tslint:disable-next-line: no-any
export const DropdownMenu: React.FC<MenuProps<any>> = ({
    innerProps,
    children,
    className,
}) => (
    <div {...innerProps} className={'dropdown__menu ' + className}>
        {children}
    </div>
);
