import React from 'react';

class Descriprion extends React.Component {
    render() {
        return (
            <div className='container'>
                <h3 className='title'>Description</h3>
                <div className='outer'>
                    <textarea
                        className='field'
                        placeholder='Enter text'
                    ></textarea>
                </div>
            </div>
        );
    }
}

export default Descriprion;
