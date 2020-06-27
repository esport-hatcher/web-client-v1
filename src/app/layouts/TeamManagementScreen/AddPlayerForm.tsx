import React, { useState } from 'react';
import { SmartSelect } from 'app/components';
import { useDispatch } from 'react-redux';
import { createTeam, invitePlayer, fetchTeamUser } from 'app/actions';

interface IProps {
    change: Function;
    // tslint:disable-next-line: no-any
    teamId: any;
}

export const AddPlayerForm: React.FC<IProps> = ({ change, teamId }) => {
    const [valuePlayer, setPlayerSelected] = useState([{ value: Number }]);
    const dispatch = useDispatch();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(invitePlayer(valuePlayer[0].value, teamId));
        change(false);
    };
    const smartSelectProps = {
        setPlayerSelected: setPlayerSelected,
    };
    return (
        <form className='create-team-form-container' onSubmit={onSubmit}>
            <div className='add-player-form-container'>
                <div className='add-player-form-container__select'>
                    <SmartSelect {...smartSelectProps} />
                </div>
                {/*console.log(
                    'value Player' +
                        valuePlayer[0].value +
                        ' /  teamId' +
                        teamId
                )*/}
            </div>
            <label>
                <span> </span>
                <input type='submit' value='invite player' />
            </label>
        </form>
    );
};
