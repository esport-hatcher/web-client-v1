import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToggler } from 'app/custom-hooks';

interface IProps {
    items: string[];
    onSelect: (selected: string) => void;
}

export const Dropdown: React.FC<IProps> = React.memo(({ items, onSelect }) => {
    const [value, setValue] = useState(items[0]);
    const [listToggled, toggleList, toggleListSpec] = useToggler(false);
    const [width, setWidth] = useState<number>(0);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const width = listRef.current ? listRef.current.offsetWidth : 0;
        setWidth(width);
        // eslint-disable-next-line
    }, [listRef.current]);

    const onItemSelect = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>
    ) => {
        const itemValue = event.currentTarget.getAttribute('data-key')!;
        setValue(itemValue);
        onSelect(itemValue);
        toggleListSpec(false);
    };

    const displayList = () => {
        return items.map((item: string) => {
            return (
                <li
                    className='dropdown__list__item'
                    key={item}
                    data-key={item}
                    onClick={onItemSelect}
                >
                    {item}
                </li>
            );
        });
    };

    return (
        <div
            className={`dropdown ${listToggled && 'dropdown--active'}`}
            style={{ width }}
        >
            <div className='dropdown__header'>
                <div className='dropdown__header__value'>{value}</div>
                <FontAwesomeIcon
                    icon='chevron-down'
                    className={`dropdown__header__icon ${listToggled &&
                        'dropdown__header__icon--rotated'}`}
                    onClick={toggleList}
                />
            </div>
            <ul
                className={`dropdown__list ${listToggled &&
                    'dropdown__list--active'}`}
                ref={listRef}
            >
                {displayList()}
            </ul>
        </div>
    );
});
