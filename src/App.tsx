import React from 'react';
import classes from './app.module.scss';
import Main from './components/main/main';

function App() {
  return (
    <div className={classes.wrapper}>
      <header>
        <h1
          style={{
            color: 'white',
            fontSize: '48px',
          }}
        >
          Crash test
        </h1>
      </header>
      <Main />
      <footer>
        <span>Ilya Ivanchikov</span>
      </footer>
    </div>
  );
}

export default App;
