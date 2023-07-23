import { useState, useEffect } from 'react';
import {BsArrowRight} from 'react-icons/bs';

import './App.css';

function App() {
  const [data, setData] = useState([])
  const [fromPlace, setFromPlace] = useState("")
  const [toPlace, setToPlace] = useState("")
  const [displayArrivalList, setDisplayArrivalList] = useState(true)
  const [displayDepartureList, setDisplayDepartureList] = useState(true)
  const [filterData, setFilterData] = useState([])
  
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const apiUrl = "https://kodam-vinay.github.io/flights-api/flight-mockdata.json"
    const fetchData = await fetch(apiUrl)
    const jsonData = await fetchData.json()
    const convertData = jsonData.map(eachItem => ({
      airline: eachItem?.airline,
      arrivalAirport: eachItem?.arrival_airport,
      arrivalCity: eachItem?.arrival_city,
      arrivalCountry: eachItem?.arrival_country,
      arrivalDate: eachItem?.arrival_date,
      departureAirport: eachItem?.departure_airport,
      departureCity: eachItem?.departure_city,
      departureCountry: eachItem?.departure_country,
      departureDate: eachItem?.departure_date,
      flightNumber: eachItem?.flight_number,
      id: eachItem?.id
    }))
    setData(convertData)
  }
  
  const uniqueArrivalCities = new Set(data.map(eachItem => eachItem.arrivalCity))
  const uniqueDipartureCities = new Set(data.map(eachItem => eachItem.departureCity))
  const arrivalArray = [...uniqueArrivalCities]
  const departuteArray = [...uniqueDipartureCities]
  const filterArrival = arrivalArray.filter(eachItem => eachItem.toLowerCase().includes(fromPlace.toLowerCase()))
  const filterDeparture = departuteArray.filter(eachItem => eachItem.toLowerCase().includes(toPlace.toLowerCase()))
  const onClickSearch = () => {
    const result = data.filter(eachItem => eachItem?.arrivalCity.toLowerCase().includes(fromPlace.toLowerCase()) &&       
    eachItem?.departureCity.toLowerCase().includes(toPlace.toLowerCase()))
    setFilterData(result)
  }
  const selectedFromPlace =(item)=>{
    setFromPlace(item)
    setDisplayArrivalList(false)
  }
  const selectedToPlace = (item) => {
    setToPlace(item)
    setDisplayDepartureList(false)
  }
  return (
    <>
    <div className='main-bg-container'>
      <div>
        <input type="text" placeholder='From:' onChange={(event) => {setFromPlace(event.target.value); setDisplayArrivalList(true)}} value={fromPlace}/>
        { displayArrivalList && filterArrival.length < arrivalArray.length ?
        <ul>{filterArrival.map((eachItem, index) => (
          <li key={index} onClick={()=>selectedFromPlace(eachItem)}>{eachItem}</li>
        ))}</ul>
        :null}
      </div>
      <BsArrowRight size={'30px'}/>
      <div>
        <input type="text" placeholder='To:' onChange={(event) => {setToPlace(event.target.value); setDisplayDepartureList(true)}} value={toPlace}/>
        { displayDepartureList && filterDeparture.length < departuteArray.length ?
        <ul>{filterDeparture.map((eachItem, index) => (
          <li key={index} onClick={() => selectedToPlace(eachItem)}>{eachItem}</li>
        ))}</ul>
        :null}
      </div>
      <button type='button' onClick={onClickSearch}>search</button>
    </div>
    <div className='results-container'>
      <h1>Avaialbe Flights</h1>
    </div>
    </>
  );
}

export default App;
