import { useState, useEffect, useRef } from 'react';
import DataContext from './contexts/DataContext';
import Content from './components/Content';
import AddBook from './components/AddBook';
import './App.css';
import dummyData from '../dummyData.json';

function App() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);

  const gotData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch('/getbooks');
        //const apiData = await response.json();
        //console.log(apiData);
        //setData(apiData);
        setData(dummyData);
        // Get the sheet names to fill in the select options
        //setYears(apiData.map((element) => element.sheet));
        setYears(dummyData.map((element) => element.sheet));
        gotData.current = true;
      } catch (error) {
        console.error(error);
      }
    };

    if (!gotData.current) {
      fetchData();
    }
  }, []);

  return (
    <>
      <h1>Book Tracker</h1>
      <DataContext.Provider value={{ data, years }}>
        <Content data={data} years={years} />
        <AddBook data={data} years={years} />
      </DataContext.Provider>
    </>
  );
}

export default App;
