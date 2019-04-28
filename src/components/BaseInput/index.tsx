import React, { Component } from 'react';
import styles from './BaseInput.module.scss';

interface BaseInputProps {
  placeholder: string;
}

export class BaseInput extends Component<BaseInputProps> {
  constructor(props: BaseInputProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <input
          placeholder={this.props.placeholder}
          className={styles.shape}
          type="text"
        />
      </div>
    );
  }
}

export default BaseInput;
