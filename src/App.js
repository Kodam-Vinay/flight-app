import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const apiUrl = "https://kodam-vinay.github.io/flights-api/api-flight-details.json"
    const fetchData = await fetch(apiUrl)
    const jsonData = await fetchData.json()
    setData(jsonData)
  }
  console.log(data)
  return (
    <div className='main-bg-container'>
      hello
    </div>
  );
}

export default App;
