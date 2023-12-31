import { useState, useEffect } from 'react';
import {BsArrowRight, BsSearch} from 'react-icons/bs';
import {MdFlightTakeoff} from 'react-icons/md'
import {format} from 'date-fns'

import './App.css';
import FlightItem from './FlightItem';

function App() {
  const [data, setData] = useState([])
  const [fromPlace, setFromPlace] = useState("")
  const [toPlace, setToPlace] = useState("")
  const [displayArrivalList, setDisplayArrivalList] = useState(true)
  const [displayDepartureList, setDisplayDepartureList] = useState(true)
  const [filterData, setFilterData] = useState([])
  const [errorArrival, setErrorArrival] = useState(false)
  const [errorDeparture, setErrorDeparture] = useState(false)
  const [isSearchClicked, setSearchClicked] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [isDateSelected, setToDateSelected] = useState(false)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    try {
      const apiUrl = "https://kodam-vinay.github.io/flights-api/flight-mockdata.json"
      const fetchData = await fetch(apiUrl)
      const jsonData = await fetchData.json()
      const convertData = jsonData.map(eachItem => ({
        airline: eachItem?.airline,
        arrivalCity: eachItem?.arrival_city,
        arrivalDate: format( new Date(eachItem?.arrival_date), 'MM/dd/yyyy'),
        departureCity: eachItem?.departure_city,
        arrivalTime: eachItem.arrival_time,
        price: eachItem.price,
        id: eachItem?.id
      }))
      setData(convertData)
    } catch (error) {
      throw new Error(error);
    }
  }
  const uniqueArrivalCities = new Set(data.map(eachItem => eachItem.arrivalCity))
  const uniqueDipartureCities = new Set(data.map(eachItem => eachItem.departureCity))
  const arrivalArray = [...uniqueArrivalCities]
  const departuteArray = [...uniqueDipartureCities]
  const filterArrival = arrivalArray.filter(eachItem => eachItem.toLowerCase().includes(fromPlace.toLowerCase()))
  const filterDeparture = departuteArray.filter(eachItem => eachItem.toLowerCase().includes(toPlace.toLowerCase()))
  const onClickSearch = () => {
    setSearchClicked(true)
    if(!fromPlace){
      setErrorArrival(true)
    }
    if(!toPlace){
      setErrorDeparture(true)
    }
    if(!selectedDate){
      setToDateSelected(true)
    }
    if(fromPlace && toPlace && selectedDate){
      const formatDate =format( new Date(selectedDate), 'MM/dd/yyyy')
      const result = data.filter(eachItem => (eachItem?.arrivalCity?.toLowerCase().includes(fromPlace.toLowerCase()) &&       
      eachItem?.departureCity?.toLowerCase().includes(toPlace.toLowerCase())) && eachItem.arrivalDate.includes(formatDate))
      setFilterData(result)
    }
    
  }
  const selectedFromPlace =(item)=>{
    setFromPlace(item)
    setDisplayArrivalList(false)
  }
  const selectedToPlace = (item) => {
    setToPlace(item)
    setDisplayDepartureList(false)
  }

  const setDate = event => {
    setSelectedDate(event.target.value)
    setToDateSelected(false)
  }
  return (
    <>
    <div className='main-bg-container'>
      <div>
        <input type="text" className='search-input' placeholder='From:' onChange={(event) => {setFromPlace(event.target.value); 
          setDisplayArrivalList(true); setErrorArrival(false)}} value={fromPlace}/>
          {errorArrival ? <p className='show-the-error'>Please Select a valid city*</p> : null}
        { displayArrivalList && filterArrival?.length < arrivalArray?.length ?
        <ul className='show-the-list-of-cities'>{filterArrival.length > 0 ? filterArrival?.map((eachItem, index) => (    
            <li className='each-city-list-item-name' key={index} onClick={()=>selectedFromPlace(eachItem)}><MdFlightTakeoff/> {eachItem}</li>
        )) : <p>no results</p>}</ul>
        :null}
        <input type="date" className="search-input" value={selectedDate} onChange={setDate}/>
        {isDateSelected ? <p className='show-the-error'>Please select the date*</p> : null}
      </div>

      <BsArrowRight size={'30px'} className='arrow-right-icon'/>

      <div>
        <input type="text" className='search-input' placeholder='To:' onChange={(event) => {setToPlace(event.target.value); 
         setDisplayDepartureList(true);setErrorDeparture(false)}} 
          value={toPlace}/>
          {errorDeparture ? <p className='show-the-error'>Please Select a valid city*</p> : null}
        { displayDepartureList && filterDeparture?.length < departuteArray?.length ?
        <ul className='show-the-list-of-cities'>{filterDeparture.length > 0 ? filterDeparture.map((eachItem, index) => (
          <li className='each-city-list-item-name' key={index} onClick={() => selectedToPlace(eachItem)}><MdFlightTakeoff/> {eachItem}</li>
        )) : <p>no results</p>}</ul>
        :null}
      </div>
      <button type='button' className='search-button' onClick={onClickSearch}>
        <BsSearch size={'30px'}/>
        </button>
    </div>
    <div className='results-container'>
      <h1>Avaialbe Flights</h1>
      {filterData.length > 0 ? 
      <ul className='show-flights-ul-list'>{filterData?.map(eachItem => (
        <FlightItem key={eachItem.id} flightsList={eachItem}/>
      ))}</ul>
      : (isSearchClicked && fromPlace && toPlace) ?  <h2 className='no-flights-text'>No Flights Found At This Moment...</h2> : null}
    </div>
    </>
  );
}

export default App;
