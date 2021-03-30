import React, { useState, useEffect } from 'react';
import classes from './Search.module.scss'
import {useFetch} from 'use-http';
import {getApiUrl} from '../../utils/apiUtils';

export const Search = ({setSections, sectionsKey, setSectionsKey}) => {
  const [value, setValue] = useState('');

  const {loading: syncLoading, error: syncError, data: syncData} =
    useFetch(getApiUrl('sections/sync'), {cachePolicy: 'no-cache'}, []);

  const {get, response, loading, error} = useFetch(getApiUrl('sections/search'), {cachePolicy: 'no-cache'});

  useEffect(() => {
    if (response && response.data && response.data.data) {
      const sections = Object.entries(response.data.data.reduce((prev, curr) => (
        {
          ...prev,
          [curr.section]: [...prev[curr.section] || [], curr.child]
        }
      ), {})).map(([section, children], index) => ({
        parent: section,
        children,
      }));
      setSections(sections);
    }
  }, [loading, response, setSections]);

  const onChange = event => {
    setValue(event.target.value);
  }

  const search = () => {
    if (value) {
      get(`/${value}`);
    } else {
      setSectionsKey(sectionsKey + 1)
    }
  }

  const onCancel = event => {
    setValue('');
    setSectionsKey(sectionsKey + 1);
  }

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      search()
    }
  };

  return (
    <div className={classes.container}>
      {syncError && 'Упс... Произошла ошибка. Невозможно загрузить список документов'}
      {syncLoading && 'Загрузка...'}
      {syncData && (
        <div>
          <div className="ui action input">
            <input onChange={onChange} onKeyDown={onKeyDown} value={value} type="text" placeholder="Поиск..."/>
            <button className="ui icon button" onClick={search} >
              <i aria-hidden="true" className="search icon"/>
            </button>
            <button className="ui icon button" onClick={onCancel} >
              <i aria-hidden="true" className="close icon"/>
            </button>
          </div>
          {error && 'Упс... Произошла ошибка. Невозможно загрузить список документов'}
          {loading && 'Загрузка...'}
        </div>
      )}
    </div>
  )
}

