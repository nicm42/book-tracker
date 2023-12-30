import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const apiData = await response.json();
        //console.log(apiData);
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <></>;
}

export default App;
