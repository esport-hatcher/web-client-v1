import React, { Component } from 'react';
import SmartInput from '@/components/SmartInput';
import { isEmail } from '@/services/utils';

const checkIfMinMax = (value: string) => {
    if (value.length < 5) {
        return false;
    }
    return true;
};

export class LoginPage extends Component {
    render() {
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
                    customValidation={checkIfMinMax}
                    placeholder='Password'
                />
            </div>
        );
    }
}

export default LoginPage;
