import React from 'react';

class Plus extends React.Component {
    render() {
        return (
            <div
                className='card plus'
                style={{ width: '100px', height: '90px' }}
            >
                <div className='circle'>
                    <div className='horizontal'></div>
                    <div className='vertical'></div>
                </div>
            </div>
        );
    }
}

export default Plus;
