import React from 'react';
import { AutoComplete } from 'app/components';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';
import { StoryWrapper } from 'app/shared/StoryWrapper';

export default { title: 'AutoComplete' };

export const basic = () => (
    <StoryWrapper>
        <AutoComplete
            items={['Andorre', 'Angleterre', 'Algérie', 'Andalousie', 'France']}
            // tslint:disable-next-line: no-console
            onSelect={(selected: string) => console.log(selected)}
            icon='pin'
        />
    </StoryWrapper>
);

export const second = () => (
    <StoryWrapper>
        <AutoComplete
            items={['Andorre', 'Angleterre', 'Algérie', 'Andalousie', 'France']}
            // tslint:disable-next-line: no-console
            onSelect={(selected: string) => console.log(selected)}
            icon='pin'
        />
    </StoryWrapper>
);
