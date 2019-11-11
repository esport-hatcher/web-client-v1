import React, { useState, useEffect } from 'react';
import { CreateTeamForm, AddPlayerForm } from '@/layouts';
import { Icon } from '@/components';
import { Link } from 'react-router-dom';
import api from '@/api';

import { useDispatch } from 'react-redux';
import { fetchTeams } from '@/actions';

const Modal = ({
    handleClose,
    show,
    children,
}: {
    // tslint:disable: no-any
    handleClose: any;
    show: boolean;
    children: any;
}) => {
    const showHideClassName = show
        ? 'modal display-block'
        : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                {children}
                <div onClick={handleClose} className='close-thik'>
                    X
                </div>
            </section>
        </div>
    );
};

export const _TeamPage: React.FC = () => {
    const dispatch = useDispatch();
    const [show, setshow] = useState(false);
    const [teams, setteam] = useState<
        null | [{ name: string; bannerUrl: string }]
    >(null);

    useEffect(() => {
        // tslint:disable-next-line: no-floating-promises
        getTeam();
        //dispatch(fetchTeams());
    }, [dispatch]);

    const getTeam = async () => {
        const info = localStorage.getItem('ehToken');
        if (info === null) {
            return 400;
        }
        const obj = JSON.parse(info);
        try {
            const { data } = await api.get(`users/${obj.user.id}/teams`, {
                headers: {
                    Authorization: `Bearer ${obj.token}`,
                },
            });
            setteam(data);
            return 200;
        } catch {
            return 400;
        }
    };

    const showModal = () => {
        setshow(true);
    };

    const hideModal = () => {
        setshow(false);
    };

    return (
        <main>
            {teams &&
                teams.map(item => {
                    return (
                        <Link
                            to={`team/${item.name}`}
                            className='select-team-box'
                            style={{
                                backgroundImage: `url(${item.bannerUrl})`,
                            }}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            <div className='select-team-box' onClick={showModal}>
                <Icon className='nav-bar__item__icon' name='cross' />
            </div>
            <Modal show={show} handleClose={hideModal}>
                <div className='col-1'>
                    <h1>Create your team</h1>
                    <CreateTeamForm />
                </div>
                <div className='col-2'>
                    <h1>Select your player</h1>
                    <AddPlayerForm />
                </div>
            </Modal>
        </main>
    );
};
