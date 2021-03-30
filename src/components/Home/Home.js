import React, { useState } from 'react';
import classes from './Home.module.scss'
import {Container} from '../Container';
import { Sections } from '../Sections';
import { Search } from '../Search';

export const Home = () => {
  const [sections, setSections] = useState(null);
  const [sectionsKey, setSectionsKey] = useState(1);
  return (
    <Container className={classes.container}>
      <div className={classes.searchContainer}>
        <Search sections={sections} setSections={setSections} setSectionsKey={setSectionsKey} sectionsKey={sectionsKey} />
      </div>
      <Sections sections={sections} setSections={setSections} key={sectionsKey} />
    </Container>
  )
};

