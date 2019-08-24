import React, { Component } from 'react';

interface IHeaderP {
    title: string;
}

export class Header extends Component<IHeaderP> {
    render() {
        const { title } = this.props;

        return (
            <div className='header'>
                <h1 className='header__title title title--xs'>{title}</h1>
            </div>
        );
    }
}

export default Header;
