import React from 'react';
import Input from './Input';

export const SearchField: React.FC = React.memo(() => {
    return (
        <div className='card'>
            <div className='search-container'>
                <h1 className='search'>Team members</h1>
                <Input />
            </div>
        </div>
    );
});
