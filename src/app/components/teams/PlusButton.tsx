import React from 'react';

class PlusButton extends React.Component {
    render() {
        return (
            <div
                className='btn--plus'
                style={{ width: '100px', height: '90px' }}
            >
                <div className='btn--plus__circle'>
                    <div className='btn--plus__horizontal'></div>
                    <div className='btn--plus__vertical'></div>
                </div>
            </div>
        );
    }
}

export default PlusButton;
