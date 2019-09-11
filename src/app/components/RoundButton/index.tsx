import React, { Component } from 'react';

interface IRoundButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export class RoundButton extends Component<IRoundButtonProps> {
    render() {
        const { onClick } = this.props;

        return (
            <div>
                <button className='btn btn--round' onClick={onClick}>
                    <i className='fas fa-chevron-right' />
                </button>
            </div>
        );
    }
}
