import React from 'react';
import { OptionProps } from 'react-select';
import cx from 'classnames';

// tslint:disable-next-line: no-any
export const DropdownOption: React.FC<OptionProps<any>> = ({
    innerRef,
    innerProps,
    children,
    isSelected,
    className,
}) => (
    <div
        // TEMPORARY FIX: FAIL PACKAGE
        // tslint:disable-next-line: no-any
        {...(innerProps as any)}
        ref={innerRef}
        className={cx('dropdown__option body-text body-text--sm ' + className, {
            'dropdown__option--selected': isSelected,
        })}
    >
        {children}
    </div>
);
