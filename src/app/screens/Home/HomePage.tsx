import React, { useCallback } from 'react';
import { AutoComplete } from '@/components';

const items = ['France', 'Angleterre', 'Germany', 'Andorre', 'Algérie'];

export const _HomePage: React.FC = () => {
    const onSelect = useCallback((item: string) => {
        // tslint:disable-next-line: no-console
        console.log(item);
    }, []);

    return (
        <main>
            <AutoComplete items={items} onSelect={onSelect} />
        </main>
    );
};
