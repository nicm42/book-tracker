import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        console.log(data[0].properties.title); // This is the sheet data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <></>;
}

export default App;
