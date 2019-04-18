import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './Button.module.scss';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button className={styles.error}>Error Button</button>;
        </header>
      </div>
    );
  }
}

export default App;
