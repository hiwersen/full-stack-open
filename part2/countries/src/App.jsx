import { useEffect, useRef, useState } from 'react'
import Country from './components/Country.jsx'
import axios from 'axios'
import Search from './components/Search.jsx'
import List from './components/List.jsx'
import Notification from './components/Notification.jsx'
import getWeatherData from './services/getWeatherData.js'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

function App() {
  const [country, setCountry] = useState(null) // the country object
  const [weather, setWeather] = useState(null) // the weather of the selected country's capital
  const [value, setValue] = useState('') // the input value
  const [list, setList] = useState([]) // the list of filtered names
  const [name, setName] = useState(null) // the selected country's name
  const [showNotification, setShowNotification] = useState(false) // the notification flag

  let names = useRef([]) // the list of all countries' names
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/names')
      .then(({ data }) => names.current = data)
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (name) {
      axios
      .get(`${url}${name}`)
      .then(({ data: country }) =>  {
        const { 
          capitalInfo: { 
            latlng: [ 
              latitude, 
              longitude ] } } 
          = country

        getWeatherData(latitude, longitude)
              .then(data => {
                setCountry(country) // set country and weather together
                setWeather(data) // set country and weather together
              })
              .catch(error => console.log(error))
        
      })
      .catch(error => console.log(error))
    } else {
      setCountry(null)
      setWeather(null)
    }
  }, [name])

  const resetState = () => {
    setCountry(null)
    setList([])
    setName(null)
    setShowNotification(false)
  }

  const getList = value => {
    // Handle edge case: 
    // "the name of the country is part of the name of another country"
    // Is there a country name that matches the current search value?
    const found = names.current.find(({ common }) => 
      common.toLowerCase() === value.toLowerCase())
    // if so, return that country's common name
    if (found) return [found.common]

    // if not, perform the search on the substring
    const regex = new RegExp(value, 'i')
    return names.current
        .filter(({ common }) => regex.test(common))
        .map(({ common }) => common)
  }

  const handleChange = ({ target: { value } }) => {
    setValue(value)

    if (!value) {
      resetState()
      return
    } 

    const list = getList(value)

    list.length === 1 
      ? setName(list[0])
      : setName(null)

    list.length > 10
      ? setShowNotification(true)
      : setShowNotification(false)

    setList(list)
  }

  const handleClick = event => handleChange(event)

  return (
    <>
      <Search value={value} onChange={handleChange} />
      { // Show either notification or list but not both
        showNotification
          ? <Notification />
          : <List list={list} onClick={handleClick} />
      }
      <Country country={country} weather={weather} />
    </>
  )
}

export default App
