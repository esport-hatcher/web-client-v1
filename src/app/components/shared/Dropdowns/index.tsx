import React from 'react';
import Select, { Styles } from 'react-select';
import { SelectComponentsProps } from 'react-select/src/Select';
import {
    color_dark,
    color_blue_light,
    color_white,
    color_light_grey,
    color_dark_two,
    color_dark_medium,
    container_box_shadow,
} from 'app/config';

interface IProps extends SelectComponentsProps {
    valueBackgroundColor?: string;
    optionBackgroundColor?: string;
    separatorOnFocus?: boolean;
}

export const Dropdown: React.FC<IProps> = React.memo(
    ({
        valueBackgroundColor = color_dark_medium,
        optionBackgroundColor = color_dark,
        separatorOnFocus = false,
        ...selectProps
    }) => {
        const customStyle: Partial<Styles> = {
            option: (provided, state) => ({
                ...provided,
                padding: '2rem 4rem',
                backgroundColor: state.isSelected
                    ? color_blue_light
                    : optionBackgroundColor,
                color: color_white,
                fontSize: '1.2rem',
                letterSpacing: '1.2px',
                transition: 'all 0.4s',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: color_dark_two,
                },
            }),
            control: (provided, state) => ({
                ...provided,
                backgroundColor: valueBackgroundColor,
                border: 'none',
                borderRadius: 8,
                boxShadow: 'none',
                transition: 'all 0.4s',
                cursor: 'pointer',
                '&:hover': {
                    borderColor: color_blue_light,
                },
            }),
            valueContainer: provided => ({
                ...provided,
                paddingLeft: '1.8rem',
            }),
            singleValue: (provided, state) => ({
                ...provided,
                color: state.selectProps.menuIsOpen
                    ? color_white
                    : color_light_grey,
                fontSize: '1.2rem',
                letterSpacing: '1.2px',
                textAlign: 'right',
                textTransform: 'uppercase',
                transition: 'all 0.4s',
            }),
            menuPortal: provided => ({
                ...provided,
                backgroundColor: color_dark,
                boxShadow: container_box_shadow,
                borderRadius: 0,
            }),
            menuList: provided => ({
                ...provided,
                padding: 0,
                borderRadius: '8px',
            }),
            menu: provided => ({
                ...provided,
                backgroundColor: color_dark,
                boxShadow: container_box_shadow,
            }),
            dropdownIndicator: (provided, state) => {
                return {
                    ...provided,
                    transition: 'all 0.4s',
                    color: state.selectProps.menuIsOpen
                        ? color_white
                        : color_light_grey,
                    transform: state.selectProps.menuIsOpen
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    '&:hover': {
                        color: color_blue_light,
                    },
                };
            },
            indicatorSeparator: (provided, state) => ({
                ...provided,
                transition: 'all 0.4s',
                backgroundColor: separatorOnFocus
                    ? state.selectProps.menuIsOpen
                        ? color_white
                        : 'transparent'
                    : state.selectProps.menuIsOpen
                    ? color_white
                    : color_light_grey,
            }),
        };

        return (
            <Select
                {...selectProps}
                styles={{ ...customStyle, ...selectProps }}
                defaultValue={selectProps.options[0]}
                menuPortalTarget={document.getElementById('root-portal')}
            />
        );
    }
);
