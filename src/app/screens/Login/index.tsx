import React, { Component } from 'react';
import SmartInput from '@/components/SmartInput';
import { isEmail, getMinMaxFunction } from '@/shared/utils';

export class LoginPage extends Component {
    render() {
        const minMax = getMinMaxFunction(5, 20);
        return (
            <div>
                <SmartInput
                    type='email'
                    name='Email'
                    customValidation={isEmail}
                    placeholder='Email'
                    register={true}
                />
                <SmartInput
                    type='password'
                    name='password'
                    customValidation={minMax}
                    placeholder='Password'
                />
            </div>
        );
    }
}

export default LoginPage;
