import React from 'react';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';
import { StoryWrapper } from 'app/shared/StoryWrapper';
import { Spinner } from 'app/components/shared/Spinner';

export default { title: 'Spinner' };

export const basic = () => (
    <StoryWrapper>
        <Spinner />
    </StoryWrapper>
);
