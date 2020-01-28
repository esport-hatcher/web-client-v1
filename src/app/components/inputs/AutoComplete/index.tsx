import React, { useEffect, useState, useCallback } from 'react';
import { useInput, useToggler } from 'app/custom-hooks';
import { SmartInput } from 'app/components';
import { IIcons } from '../../Icon';

interface IProps {
    items: string[];
    icon: keyof IIcons;
    onSelect: (selected: string) => void;
}

export const AutoComplete: React.FC<IProps> = React.memo(
    ({ items, onSelect, icon }) => {
        const [country, onChange] = useInput();
        const [matchings, setMatchings] = useState<string[]>([]);
        const [listDisplayable, , setListDisplayable] = useToggler(false);

        useEffect(() => {
            if (country.length > 0) {
                const reg = new RegExp('^' + country.toLowerCase() + '.*');
                return setMatchings(
                    items.filter(item => item.toLowerCase().match(reg))
                );
            }
            return setMatchings([]);
        }, [country, items]);

        const toggleListOn = useCallback(() => {
            setListDisplayable(true);
        }, [setListDisplayable]);

        const toggleListOff = useCallback(() => {
            setTimeout(() => setListDisplayable(false), 200);
        }, [setListDisplayable]);

        const onItemSelect = useCallback(
            (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                const itemValue = event.currentTarget.getAttribute('data-key')!;
                onChange({
                    target: {
                        name: itemValue,
                        value: itemValue,
                    },
                });
                onSelect(itemValue);
                setListDisplayable(false);
            },
            [onSelect, onChange, setListDisplayable]
        );

        const displayItems = () => {
            return matchings.map(item => {
                return (
                    <li
                        key={item}
                        data-key={item}
                        className='auto-complete__list__item'
                        onClick={onItemSelect}
                    >
                        <p className='important-info important-info--sm auto-complete__list__item__text'>
                            {item}
                        </p>
                    </li>
                );
            });
        };

        const isListDisplayable = (): boolean => {
            if (matchings.length > 0 && listDisplayable) {
                return true;
            }
            return false;
        };

        const displayList = () => {
            if (isListDisplayable()) {
                return (
                    <ul className='auto-complete__list'>{displayItems()}</ul>
                );
            }
            return null;
        };

        return (
            <div className='auto-complete'>
                <SmartInput
                    value={country}
                    icon={icon}
                    name='auto-complete'
                    onChange={onChange}
                    placeholder='Country'
                    type='text'
                    className={
                        isListDisplayable() ? 'auto-complete__input' : ''
                    }
                    onFocus={toggleListOn}
                    onLoseFocus={toggleListOff}
                />
                {displayList()}
            </div>
        );
    }
);
