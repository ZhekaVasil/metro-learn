import React from 'react';
import classes from './Header.module.scss'
import Logo from '../../metro.png';

export const Header = () => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Служба безопасности ГП "Минский метрополитен"</h2>
      <img src={Logo} className={classes.image} />
    </div>
  )
};

