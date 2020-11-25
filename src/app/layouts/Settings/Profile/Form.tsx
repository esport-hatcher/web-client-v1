import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { patchUserSession, IUser } from 'app/actions';
import { Dropdown, IOption, ModifiableInput } from 'app/components';

interface IProps {
    user: IUser;
}

export const SettingsProfileForm: React.FC<IProps> = React.memo(({ user }) => {
    const dispatch = useDispatch();
    const options = [
        { value: 'EU_WEST', label: "Europe de l'Ouest" },
        { value: 'EU_EAST', label: "Europe de l'Est" },
        { value: 'BRAZIL', label: 'Brésil' },
        { value: 'KOREA', label: 'Corée du Sud' },
        { value: 'LAT_NORTH', label: 'Amérique latine du Nord' },
        { value: 'LAT_SOUTH', label: 'Amérique latine du Sud' },
        { value: 'AMERICA_NORTH', label: 'Amérique du Nord' },
        { value: 'OCEANIA', label: 'Océanie' },
        { value: 'TURKEY', label: 'Turquie' },
        { value: 'RUSSIA', label: 'Russie' },
        { value: 'JAPAN', label: 'Japon' },
        { value: 'PBE', label: 'PBE' },
    ];
    const renderDropdown = () => {
        const defaultLabel = options.find(
            item => item.value === user.lolRegion
        );
        let defaultOption: IOption;
        if (defaultLabel) {
            defaultOption = {
                value: user.lolRegion,
                label: defaultLabel.label,
            };
            return (
                <Dropdown
                    className='settings-profile__form__lol-infos__dropdown'
                    options={options}
                    name='region'
                    defaultValue={defaultOption}
                    onChange={onOptionChange}
                />
            );
        }
    };

    const onInputChange = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            dispatch(patchUserSession({ [e.target.name]: e.target.value }));
        },
        [dispatch]
    );

    const onOptionChange = useCallback(
        value => {
            if (value) {
                dispatch(patchUserSession({ lolRegion: value.value }));
            }
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
                />
                <ModifiableInput
                    value={user.lastName}
                    label='Lastname'
                    name='lastName'
                    onChange={onInputChange}
                />
                <ModifiableInput
                    value={user.username}
                    label='Username'
                    name='username'
                    onChange={onInputChange}
                />
                <ModifiableInput
                    value={user.email}
                    label='Email'
                    name='email'
                    onChange={onInputChange}
                />
                <ModifiableInput
                    value={user.country}
                    label='Country'
                    name='country'
                    onChange={onInputChange}
                />
                <ModifiableInput
                    value={user.city}
                    label='City'
                    name='city'
                    onChange={onInputChange}
                />
                <ModifiableInput
                    value={`+${user.phoneNumber}`}
                    label='Phone number'
                    name='phoneNumber'
                    onChange={onInputChange}
                />
                <div className='settings-profile__form__lol-infos'>
                    <ModifiableInput
                        value={`${user.lolSummonerName}`}
                        label='League of Legends Username'
                        name='lolSummonerName'
                        onChange={onInputChange}
                    />
                    {renderDropdown()}
                </div>
                <ModifiableInput
                    value={`${user.twitchUsername}`}
                    label='Twitch Username'
                    name='twitchUsername'
                    onChange={onInputChange}
                />
            </div>
        );
    }
    return null;
});
