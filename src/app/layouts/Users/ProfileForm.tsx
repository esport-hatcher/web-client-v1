import React, { useCallback } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { useSelector } from '@/custom-hooks';
import { patchUser } from '@/actions';
import { ModifiableInput } from '@/components/inputs/ModifiableInput';

interface IProps {
    test?: boolean;
}

export const UserProfileForm: React.FC<IProps> = () => {
    const user = useSelector(state => state.authentication.user, shallowEqual);
    const dispatch = useDispatch();

    const onInputChange = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            dispatch(patchUser({ [e.target.name]: e.target.value }));
        },
        [dispatch]
    );

    if (user) {
        return (
            <div className='profile-settings-form'>
                <ModifiableInput
                    value={user.firstName}
                    label='Firstname'
                    name='firstName'
                    onChange={onInputChange}
                />
            </div>
        );
    }
    return null;
};
