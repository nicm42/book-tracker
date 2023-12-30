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

  return (
    <>
      <h1>Book Tracker</h1>
      <label>
        Choose a year to see statistics for:
        <select name="selectedYear">
          <option value="">Select a year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </label>
    </>
  );
}

export default App;
