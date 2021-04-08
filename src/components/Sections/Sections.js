import React, {useEffect, useState} from 'react';
import {useFetch} from 'use-http';
import classes from './Sections.module.scss';
import {getApiUrl, getSectionUrl} from '../../utils/apiUtils';
import {Accordion, Icon} from 'semantic-ui-react';
// import { shell } from 'electron';
const { shell } = window.require('electron');

export const Sections = ({sections, setSections}) => {
  const [activeIndex, setActiveIndex] = useState();

  const {loading, error, data} = useFetch(getApiUrl('sections'), {cachePolicy: 'no-cache'}, []);

  useEffect(() => {
    if (data && data.data) {
      setSections(data.data);
    }
  }, [data])

  const handleClick = (e, titleProps) => {
    const {index} = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex);
  }

  const openDoc = (event, path) => {
    event.preventDefault();
    shell.openPath(path);
  }

  return (
    <div className={classes.container}>
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список документов'}
      {loading && 'Загрузка...'}
      {sections && !!sections.length && (
        <Accordion styled>
          {sections.map(({parent, children}, index) => (
            <React.Fragment key={index}>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={handleClick}
              >
                <Icon name='dropdown'/>
                <span className={classes.parent}>{parent}</span>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                {children.map((i, index) => (
                  <p key={index}>
                    <a className={classes.link} onClick={event => openDoc(event, i.path)}>{i.name}</a>
                  </p>
                ))}
              </Accordion.Content>
            </React.Fragment>
          ))}
        </Accordion>
      )}
      {sections && !sections.length && 'Документов не найдено'}
    </div>
  )
};

