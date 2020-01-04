import React, { useEffect, useState, useCallback } from 'react';
import { useInput, useToggler } from '@/custom-hooks';
import { SmartInput } from '@/components';

interface IProps {
    items: string[];
    onSelect: (selected: string) => void;
}

export const AutoComplete: React.FC<IProps> = ({ items, onSelect }) => {
    const [country, onChange] = useInput();
    const [matchings, setMatchings] = useState<string[]>([]);
    const [focus, , setFocusSpecific] = useToggler(false);

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
        setFocusSpecific(true);
    }, [setFocusSpecific]);

    const toggleListOff = useCallback(() => {
        setTimeout(() => setFocusSpecific(false), 200);
    }, [setFocusSpecific]);

    const onItemSelect = useCallback(
        (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            const itemValue = event.currentTarget.getAttribute('data-key')!;
            onChange({
                target: {
                    value: itemValue,
                },
            });
            onSelect(itemValue);
            setFocusSpecific(false);
        },
        [onSelect, onChange, setFocusSpecific]
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

    const isListDsplayable = (): boolean => {
        if (matchings.length > 0 && focus) {
            return true;
        }
        return false;
    };

    const displayList = () => {
        if (isListDsplayable()) {
            return <ul className='auto-complete__list'>{displayItems()}</ul>;
        }
        return null;
    };

    return (
        <div className='auto-complete'>
            <SmartInput
                value={country}
                icon='pen'
                name='auto-complete'
                onChange={onChange}
                placeholder='Country'
                type='text'
                className={isListDsplayable() ? 'auto-complete__input' : ''}
                onFocus={toggleListOn}
                onLoseFocus={toggleListOff}
            />
            {displayList()}
        </div>
    );
};
