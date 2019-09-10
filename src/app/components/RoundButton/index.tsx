import React, { Component } from 'react';

export class RoundButton extends Component {
    render() {
        return (
            <div>
                <button className='btn btn--round'>
                    <i className='fas fa-chevron-right' />
                </button>
            </div>
        );
    }
}
