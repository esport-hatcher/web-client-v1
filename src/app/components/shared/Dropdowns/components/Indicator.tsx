import React from 'react';
import { IndicatorProps } from 'react-select';
import { FiChevronDown } from 'react-icons/fi';
import cx from 'classnames';

// tslint:disable-next-line: no-any
export const DropdownIndicator: React.FC<IndicatorProps<any>> = ({
    selectProps,
    innerProps,
    className,
}) => {
    const { menuIsOpen } = selectProps;

    return (
        <div {...innerProps} className={'dropdown__indicator ' + className}>
            <FiChevronDown
                className={cx('dropdown__indicator-icon', {
                    'icon--rotate': menuIsOpen,
                })}
            />
        </div>
    );
};
