import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { patchUserSession, IUser } from 'app/actions';
import { ModifiableInput } from 'app/components';

interface IProps {
    user: IUser;
}

export const SettingsProfileForm: React.FC<IProps> = React.memo(({ user }) => {
    const dispatch = useDispatch();

    const onInputChange = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            dispatch(patchUserSession({ [e.target.name]: e.target.value }));
        },
        [dispatch]
    );

    if (user) {
        return (
            <div className='settings-profile__form m-t-sm'>
                <ModifiableInput
                    value={user.firstName}
                    label='Firstname'
                    name='firstName'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
                <ModifiableInput
                    value={user.lastName}
                    label='Lastname'
                    name='lastName'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
                <ModifiableInput
                    value={user.username}
                    label='Username'
                    name='username'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
                <ModifiableInput
                    value={user.email}
                    label='Email'
                    name='email'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
                <ModifiableInput
                    value={user.country}
                    label='Country'
                    name='country'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
                <ModifiableInput
                    value={user.city}
                    label='City'
                    name='city'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
                <ModifiableInput
                    value={`+${user.phoneNumber}`}
                    label='Phone number'
                    name='phoneNumber'
                    onChange={onInputChange}
                    className='modifiable-input'
                />
            </div>
        );
    }
    return null;
});
