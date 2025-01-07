import { useEffect, useRef, useState } from 'react'
import Country from './components/Country'
import axios from 'axios'
import Search from './components/Search'
import List from './components/List'
import Notification from './components/Notification'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

function App() {
  const [country, setCountry] = useState(null)
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const [notification, setNotification] = useState(null)

  let names = useRef([])
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/names')
      .then(({ data }) => names.current = data)
      .catch(error => console.log(error))
  }, [])

  const getCountry = country => {
    axios
      .get(`${url}${country}`)
      .then(({ data }) => setCountry(data))
      .catch(error => console.log(error))
  }

  const handleChange = ({ target: { value } }) => {
    setValue(value)

    if (!value) {
      setCountry(null)
      setList([])
      setNotification(null)
      return
    } 

    const regex = new RegExp(value, 'i')

    const list = names.current
      .filter(({ common }) => regex.test(common))
      .map(({ common }) => common)

    if (list.length === 1) {
      getCountry(list[0])
      setList([])
      setNotification(null)
    } else {
      setCountry(null)
      if (list.length > 10) {
        setList([])
        setNotification('Too many matches, specify another filter')
      } else {
        setList(list)
        setNotification('')
      }
    }
  }

  return (
    <>
      <Search value={value} onChange={handleChange} />
      <Notification notification={notification} />
      <List list={list} />
      <Country country={country} />
    </>
  )
}

export default App
