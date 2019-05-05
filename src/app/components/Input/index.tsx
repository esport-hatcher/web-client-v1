import React, { Component } from 'react';
import styles from './Input.module.scss';

export class Input extends Component {
  render() {
    return (
      <input
        className={`${styles.shape} ${styles.normal}`}
        type="text"
        placeholder="namaste"
      />
    );
  }
}

export default Input;
