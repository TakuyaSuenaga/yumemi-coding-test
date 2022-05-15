import React, { useState, useEffect } from 'react';
import client from './axios';
import requests from './Requests';
import config from './config';
import './App.css';

function Prefectures(props) {
  const [prefectures, setPrefectures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await client.get(requests.fetchPrefectures, config);
      setPrefectures(response.data.result);
    }
    fetchData();
  }, []);

  if (!prefectures) return null;

  function renderPref(pref) {
    return (
      <div className='prefecture' key={pref.prefCode}>
        <input type="checkbox" id={pref.prefCode} name={pref.prefName} onChange={props.onChange} />
        <label htmlFor={pref.prefCode}>{pref.prefName}</label>
      </div>
    )
  }

  return (
    <div className='prefectures'>
      {prefectures.map((pref) => (
        renderPref(pref)
      ))}
    </div>
  )
}

export default Prefectures;
