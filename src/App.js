import React, { useState } from 'react';
import classes from './App.module.scss';
import { Home } from './components/Home';
import {Header} from './components/Header';

export const App = () => {
  const [pageType, setPageType] = useState('home');
  let page = null;
  switch (pageType) {
    case 'home': {
      page = <Home setPageType={setPageType} />;
      break;
    }

    default: {
      page = 'Упс... Произошла ошибка =(';
    }
  }
  return (
    <>
      <Header />
      <div className={classes.container}>
        {page}
      </div>
    </>
  )
};




