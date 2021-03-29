import React from 'react';
import classes from './Home.module.scss'
import {Button} from 'semantic-ui-react';
import {Container} from '../Container';
import { Sections } from '../Sections';

export const Home = ({ setPageType }) => {
  return (
    <Container className={classes.container}>
      <Sections />
    </Container>
  )
};

