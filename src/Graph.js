import React, { useState, useEffect } from 'react';
import client from './axios';
import requests from './Requests';
import config from './config';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Graph(props) {
  const [population, setPopulation] = useState([]);
  const prefectures = props.prefectures;
  const colors = ["red", "blue", "green", "yellow", "orange", "purple", "brown", "gray"]

  function convertPopulation() {
    const base = Array(9).fill(1980).map((x, index) => Object.create({}, {
      year: { value: x + index * 5 }
    }));
    for (let i = 0; i < base.length; i++) {
      population.map(data =>
        base[i][data.prefName] = (data.data.filter((x) => (base[i].year === x.year)))[0].value
      )
    }
    return base
  }

  useEffect(() => {
    async function fetchData(pref) {
      const response = await client.get(requests.fetchPopulation + pref.prefCode, config);
      setPopulation(p => [...p, { prefName: [pref.prefName], data: response.data.result.data[0].data }]);
    }
    setPopulation([])
    prefectures.map((pref) =>
      fetchData(pref)
    )
  }, [prefectures]);

  if (!population) return null;

  function renderLine(pref, index) {
    return (
      <Line type="line" dataKey={pref.prefName} stroke={colors[index % 8]} key={pref.prefCode} />
    )
  }

  return (
    <LineChart width={700} height={300} data={convertPopulation()} margin={{
      top: 50,
      right: 50,
      left: 20,
      bottom: 5,
    }}>
      <XAxis label={{ value: "年度", position: "right" }} dataKey="year" padding={{ right: 20 }} />
      <YAxis label={{ value: "人口数", position: "top" }} padding={{ top: 20 }} />
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
      {prefectures.map((pref, index) => renderLine(pref, index))}
    </LineChart>
  )
}

export default Graph;
