import React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import {
    DropdownValueContainer,
    DropdownIndicator,
    DropdownValue,
    DropdownOption,
    DropdownMenu,
    DropdownControl,
} from './components';

interface IDropdownProps extends SelectProps {
    controlClassName?: string;
    menuClassName?: string;
    optionClassName?: string;
    valueClassName?: string;
    valueContainerClassName?: string;
    iconClassName?: string;
}

export const Dropdown: React.FC<IDropdownProps> = React.memo(
    ({ ...dropdownProps }) => (
        <Select
            {...dropdownProps}
            classNamePrefix='dropdown'
            className={'dropdown ' + dropdownProps['className']}
            components={{
                Control: React.memo(props => (
                    <DropdownControl
                        {...props}
                        className={dropdownProps['controlClassName']}
                    />
                )),
                Menu: React.memo(props => (
                    <DropdownMenu
                        {...props}
                        className={dropdownProps['menuClassName']}
                    />
                )),
                Option: React.memo(props => (
                    <DropdownOption
                        {...props}
                        className={dropdownProps['optionClassName']}
                    />
                )),
                SingleValue: React.memo(props => (
                    <DropdownValue
                        {...props}
                        className={dropdownProps['valueClassName']}
                    />
                )),
                DropdownIndicator: React.memo(props => (
                    <DropdownIndicator
                        {...props}
                        className={dropdownProps['iconClassName']}
                    />
                )),
                ValueContainer: React.memo(props => (
                    <DropdownValueContainer
                        {...props}
                        className={dropdownProps['valueContainerClassName']}
                    />
                )),
            }}
        />
    )
);
