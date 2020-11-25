import React, { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { shallowEqual, useDispatch } from 'react-redux';
import { HeaderPage, ContactInput } from 'app/components';
import { IPageSubrouteProps } from '..';
import { useSelector, useToggler } from 'app/custom-hooks';
import { requireLogin } from 'app/HOC';
import PlusButton from 'app/components/teams/PlusButton';
import { createContact, fetchContact, IContact } from 'app/actions';
import { ModalForm } from 'app/layouts';
import { promised } from 'q';
import { any } from 'prop-types';

interface IProps extends IPageSubrouteProps {}

export const _ContactPage: React.FC<IProps> = React.memo(() => {
    const [valueName, setValueName] = useState('');
    const [valuePhone, setValuePhone] = useState('');
    const [valueEmail, setValueEmail] = useState('');
    //    const [contacts, setContacts] = useState<any[]>();
    const [showMenu, onShowMenu] = useToggler(false);
    const dispatch = useDispatch();

    useEffect(() => {
        /* Promise.resolve(dispatch(fetchContact())).then(data =>
            setContacts(data)
        );*/
    }, [dispatch]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createContact(valueName, valuePhone, valueEmail));
    };

    return (
        <main className='contact'>
            <HeaderPage title={`Contacts`} />
            <div className='team-page__modal--button' onClick={onShowMenu}>
                <PlusButton />
            </div>

            <ModalForm show={showMenu} handleClose={onShowMenu}>
                <form onSubmit={onSubmit}>
                    <div className='create-team-form__container'>
                        <div className='create-team-form__label--team-name'>
                            <ContactInput
                                setContactForm={setValueName}
                                valueForm={valueName}
                                textLabel={'Name'}
                                className={'create-team-form__input'}
                            />
                        </div>
                        <div className='create-team-form__label--region-name'>
                            <ContactInput
                                setContactForm={setValuePhone}
                                valueForm={valuePhone}
                                textLabel={'Phone'}
                                className={'create-team-form__input'}
                            />
                        </div>
                        <div className='create-team-form__label--game-name'>
                            <ContactInput
                                setContactForm={setValueEmail}
                                valueForm={valueEmail}
                                textLabel={'Email'}
                                className={'create-team-form__input'}
                            />
                        </div>
                        <button
                            className='create-team-form__submit-btn'
                            type='submit'
                            value='Submit'
                            onClick={onShowMenu}
                        >
                            Create !
                        </button>
                        <input
                            className='create-team-form__submit-btn'
                            onClick={onShowMenu}
                        />
                    </div>
                </form>
            </ModalForm>
        </main>
    );
});

export const ContactPage = requireLogin(_ContactPage);
