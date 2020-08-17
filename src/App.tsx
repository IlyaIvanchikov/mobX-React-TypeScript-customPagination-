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
          Краш тест
        </h1>
      </header>
      <Main />
      <footer>
        <span>Авторские права by Ilya Ivanchikov</span>
      </footer>
    </div>
  );
}

export default App;
