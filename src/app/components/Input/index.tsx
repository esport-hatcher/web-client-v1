import React, { Component } from 'react';
import classes from './Input.module.scss';

export class Input extends Component {
    render() {
        return (
            <input
                className={`${classes.shape} ${classes.normal}`}
                type='text'
                placeholder='namaste'
            />
        );
    }
}

export default Input;
