import React from 'react';
import Input from './Input';

class SearchField extends React.Component {
    render() {
        return (
            <div className='card'>
                <div className='search-container'>
                    <h1 className='search'>Team members</h1>
                    <Input />
                </div>
            </div>
        );
    }
}

export default SearchField;
