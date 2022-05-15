import React, { useState } from 'react';
import Prefectures from './Prefectures';
import Graph from './Graph';
import './App.css';

function App() {
  const [prefectures, setPref] = useState([])

  function handleChange(e) {
    if (e.target.checked === true) {
      setPref([...prefectures, { prefCode: e.target.id, prefName: e.target.name }])
    }
    else {
      setPref(prefectures.filter((pref, index) => (pref.prefCode !== e.target.id)))
    }
  }

  return (
    <div className="App">
      <Prefectures onChange={(e) => handleChange(e)} />
      <Graph prefectures={prefectures} />
    </div>
  );
}

export default App;
