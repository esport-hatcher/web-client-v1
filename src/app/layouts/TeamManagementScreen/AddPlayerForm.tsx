import React, { useState } from 'react';
import { SmartSelect } from '@/components';

export const AddPlayerForm: React.FC = React.memo(() => {
    const [, setPlayerSelected] = useState('');
    const smartSelectProps = {
        setPlayerSelected: setPlayerSelected,
    };
    return (
        <div className='add-player-form-container'>
            <div className='add-player-form-container__select'>
                <SmartSelect {...smartSelectProps} />
            </div>
        </div>
    );
});
