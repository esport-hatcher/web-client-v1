import React, { useEffect, useState } from 'react';
import { useInput } from '@/custom-hooks';
import { SmartInput } from '@/components';

interface IProps {
    items: string[];
    // tslint:disable-next-line: no-any
    onSelect: any;
}

export const AutoComplete: React.FC<IProps> = ({ items }) => {
    const [country, onChange] = useInput();
    const [matchings, setMatchings] = useState<string[]>([]);

    useEffect(() => {
        const reg = new RegExp('^' + country.toLowerCase() + '.*');
        setMatchings(items.filter(item => item.toLowerCase().match(reg)));
    }, [country, items]);

    const displayItems = () => {
        return matchings.map(item => {
            return (
                <li key={item} className='auto-complete__list__item'>
                    {item}
                </li>
            );
        });
    };

    const displayList = () => {
        if (matchings.length > 0) {
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
            />
            {displayList()}
        </div>
    );
};
