import React, { useState } from 'react';
import classes from './Search.module.scss'
import {useFetch} from 'use-http';
import {getApiUrl, getSectionUrl} from '../../utils/apiUtils';
import {Accordion, Icon, Input} from 'semantic-ui-react'

export const Search = (props) => {
  const [value, setValue] = useState('');
  const [activeIndex, setActiveIndex] = useState();

  const handleAccordionClick = (e, titleProps) => {
    const {index} = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex);
  }

  const {loading: syncLoading, error: syncError, data: syncData} =
    useFetch(getApiUrl('sections/sync'), {cachePolicy: 'no-cache'}, []);

  const {get, response, loading, error} = useFetch(getApiUrl('sections/search'), {cachePolicy: 'no-cache'});

  const onChange = event => {
    setValue(event.target.value);
  }

  const onClick = event => {
    get(`/${value}`);
  }

  return (
    <div className={classes.container}>
      {syncError && 'Упс... Произошла ошибка. Невозможно загрузить список документов'}
      {syncLoading && 'Загрузка...'}
      {syncData && (
        <div>
          <div className="ui action input">
            <input onChange={onChange} value={value} type="text" placeholder="Search..."/>
            <button className="ui icon button" onClick={onClick}>
              <i aria-hidden="true" className="search icon"/>
            </button>
          </div>
          {error && 'Упс... Произошла ошибка. Невозможно загрузить список документов'}
          {loading && 'Загрузка...'}
          {response && response.data && (
            <Accordion styled>
              {
                Object.entries(response.data.data.reduce((prev, curr) => (
                  {
                    ...prev,
                    [curr.section]: [...prev[curr.section] || [], curr.child]
                  }
                ), {})).map(([section, children], index) => (
                  <React.Fragment key={index}>
                    <Accordion.Title
                      active={activeIndex === index}
                      index={index}
                      onClick={handleAccordionClick}
                    >
                      <Icon name='dropdown'/>
                      <span className={classes.parent}>{section}</span>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                      {children.map((i, index) => (
                        <p key={index}>
                          <a href={getSectionUrl(section, i)} target="_blank">{i}</a>
                        </p>
                      ))}
                    </Accordion.Content>
                  </React.Fragment>
                ))
              }
            </Accordion>
          )}
        </div>
      )}
    </div>
  )
}

