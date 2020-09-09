import React from 'react';
import { SingleValueProps } from 'react-select';

// tslint:disable-next-line: no-any
export const DropdownValue: React.FC<SingleValueProps<any>> = ({
    innerProps,
    children,
    className,
}) => (
    <div
        {...innerProps}
        className={'dropdown__value body-text body-text--sm ' + className}
    >
        {children}
    </div>
);
