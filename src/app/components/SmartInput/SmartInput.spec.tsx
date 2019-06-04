import React from 'react';
import { shallow } from 'enzyme';
import { isEmail, getMinMaxFunction } from '@/shared/utils';

import SmartInput from './index';

describe('when trying to render an email input', () => {
    const wrapped = shallow(
        <SmartInput
            type='email'
            placeholder='email'
            name='email'
            customValidation={isEmail}
        />
    );

    it('should render a mail icon when in a normal state', () => {
        expect(wrapped.find('i.fas.fa-envelope')).toHaveLength(1);
    });

    it('should render a cross icon when entering an invalid email', () => {
        wrapped.setState({ input: 'test@' });
        wrapped.find('input').simulate('blur');
        expect(wrapped.find('i.fas.fa-times')).toHaveLength(1);
    });

    it('should render a check icon when entering a valid email', () => {
        wrapped.setState({ input: 'test@esport-hatcher.com' });
        wrapped.find('input').simulate('blur');
        expect(wrapped.find('i.fas.fa-check')).toHaveLength(1);
    });
});

describe('when trying to render a password input', () => {
    /**
     * Set the validator between 5 and 20 characters
     */
    const minMax = getMinMaxFunction(5, 20);
    const wrapped = shallow(
        <SmartInput
            type='password'
            placeholder='password'
            name='password'
            customValidation={minMax}
        />
    );

    it('should render a lock icon when in a normal state', () => {
        expect(wrapped.find('i.fas.fa-lock')).toHaveLength(1);
    });

    it('should render a cross icon when entering an invalid password', () => {
        wrapped.setState({ input: 'test' });
        wrapped.find('input').simulate('blur');
        expect(wrapped.find('i.fas.fa-times')).toHaveLength(1);
    });

    it('should render a check icon when entering a valid password', () => {
        wrapped.setState({ input: 'dummypassword123' });
        wrapped.find('input').simulate('blur');
        expect(wrapped.find('i.fas.fa-check')).toHaveLength(1);
    });
});
