import { useState, useEffect } from 'react';
import DataContext from './contexts/DataContext';
import Content from './components/Content';
import './App.css';
import dummyData from './dummyData.json';

function App() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* const response = await fetch('/api');
        const apiData = await response.json(); */
        //console.log(apiData);
        //setData(apiData);
        setData(dummyData);
        // Get the sheet names to fill in the select options
        //setYears(data.map((element) => element.sheet));
        setYears(dummyData.map((element) => element.sheet));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Book Tracker</h1>
      <DataContext.Provider value={{ data, years }}>
        <Content data={data} years={years} />
      </DataContext.Provider>
    </>
  );
}

export default App;
