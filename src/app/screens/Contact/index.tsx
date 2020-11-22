import React, { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { shallowEqual, useDispatch } from 'react-redux';
import { HeaderPage, LinkDrawer } from 'app/components';
import { fetchTeams, fetchEvents } from 'app/actions';
import { useSelector } from 'app/custom-hooks';
import { IPageSubrouteProps } from '..';
import { requireLogin } from 'app/HOC';
interface IProps extends IPageSubrouteProps {}

export const _ContactPage: React.FC<IProps> = React.memo(() => {
    return (
        <main className='contact'>
            <HeaderPage title={`Contacts`} />
            <div className='contact-list'>
                <form>
                    <input className='modifiable-input__input important-info important-info--md' />
                    <input className='modifiable-input__input important-info important-info--md' />
                    <input className='modifiable-input__input important-info important-info--md' />
                    <button className={`modifiable-input__btn`}>Envoyer</button>
                </form>
            </div>
        </main>
    );
});

export const ContactPage = requireLogin(_ContactPage);
