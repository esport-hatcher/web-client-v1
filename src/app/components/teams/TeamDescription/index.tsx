import React from 'react';

export const TeamDescription: React.FC = React.memo(() => {
    return (
        <div className='description__container'>
            <h3 className='description__title'>Description</h3>
            <div className='description__outer'>
                <textarea
                    className='description__outer--field'
                    placeholder='Page de presentation'
                ></textarea>
            </div>
        </div>
    );
});
