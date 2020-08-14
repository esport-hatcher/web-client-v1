import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateTeamForm, JoinTeamForm, ModalForm } from 'app/layouts';
import { TeamCard } from 'app/components';
import { useSelector, useToggler } from 'app/custom-hooks';
import { fetchTeams } from 'app/actions';
import { AiOutlinePlus } from 'react-icons/ai';

export const _TeamPage: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams.team);
    const [menuchoice, setmenuchoice] = useState(true);

    const [show, onShow] = useToggler(false);
    const [showMenu, onShowMenu] = useToggler(false);
    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    const createSelected = () => {
        onShowMenu();
        onShow();
        setmenuchoice(true);
    };

    const joinSelected = () => {
        onShowMenu();
        onShow();
        setmenuchoice(false);
    };

    return (
        <main className='team-page'>
            {teams &&
                teams.map(item => {
                    return <TeamCard item={item} />;
                })}
            <div className='team-page__modal--button' onClick={onShowMenu}>
                <AiOutlinePlus className='team-page__modal--button__icon' />
            </div>
            <ModalForm show={showMenu} handleClose={onShowMenu}>
                <div className='modal__main--container'>
                    <div className='modal__btn'>
                        <button
                            className='modal__btn--create'
                            onClick={createSelected}
                        >
                            create a team
                        </button>
                    </div>
                    <div className='modal__btn'>
                        <button
                            className='modal__btn--join'
                            onClick={joinSelected}
                        >
                            join a team
                        </button>
                    </div>
                </div>
            </ModalForm>
            {
                <ModalForm show={show} handleClose={onShow}>
                    {menuchoice ? (
                        <div className='team-page__modal'>
                            <CreateTeamForm change={onShow} />
                        </div>
                    ) : (
                        <div className='team-page__modal'>
                            {' '}
                            <JoinTeamForm change={onShow} />{' '}
                        </div>
                    )}
                </ModalForm>
            }
        </main>
    );
});
