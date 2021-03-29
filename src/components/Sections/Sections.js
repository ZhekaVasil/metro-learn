import React, {useEffect, useState} from 'react';
import {useFetch} from 'use-http';
import classes from './Sections.module.scss';
import {getApiUrl, getSectionUrl} from '../../utils/apiUtils';
import {Accordion, Icon} from 'semantic-ui-react'

export const Sections = (props) => {
  const [activeIndex, setActiveIndex] = useState();

  const handleClick = (e, titleProps) => {
    const {index} = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex);
  }

  const {loading, error, data: sections} = useFetch(getApiUrl('sections'), {cachePolicy: 'no-cache'}, []);
  return (
    <div className={classes.container}>
      {error && 'Упс... Произошла ошибка. Невозможно загрузить список документов'}
      {loading && 'Загрузка...'}
      {sections && (
        <Accordion styled>
          {sections.data.map(({parent, children}, index) => (
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
                    <a href={getSectionUrl(parent, i)} target="_blank">{i}</a>
                  </p>
                ))}
              </Accordion.Content>
            </React.Fragment>
          ))}
        </Accordion>
      )}
    </div>
  )
};

