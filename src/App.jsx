import { useState, useEffect } from 'react';
import './App.css';
import dummyData from './dummyData.json';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* const response = await fetch('/api');
        const apiData = await response.json(); */
        //console.log(apiData);
        //setData(apiData);
        setData(dummyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <></>;
}

export default App;
