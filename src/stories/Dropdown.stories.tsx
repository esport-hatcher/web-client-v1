import React from 'react';
import { Dropdown } from 'app/components';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';
import { StoryWrapper } from 'app/shared/StoryWrapper';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faChevronDown,
    faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

library.add(faChevronDown, faChevronCircleDown);

export default { title: 'Dropdown' };

export const countries = () => (
    <StoryWrapper>
        <Dropdown
            // tslint:disable-next-line: no-console
            onSelect={selected => console.log(selected)}
            items={['Andorre', 'Angleterre', 'Algérie', 'Andalousie', 'France']}
        />
    </StoryWrapper>
);

export const days = () => (
    <StoryWrapper>
        <Dropdown
            // tslint:disable-next-line: no-console
            onSelect={selected => console.log(selected)}
            items={['1', '2', '3', '4', '5']}
        />
    </StoryWrapper>
);
