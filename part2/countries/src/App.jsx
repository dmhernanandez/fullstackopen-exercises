import { useState, useEffect } from 'react'
import axios from 'axios'
import Notice from './components/Notice'
import ListCountry from './components/ListCountry'
import Country from './components/Country'
import Weather from './components/Weather'
const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [message, setMessage] = useState(null)
  const [wheater, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_OPEN_WEATHER
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => response.data)
      .then((allCountries) => allCountries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase())))
      .then(countriesFiltered => {
        if (countriesFiltered.length > 10) {
          setMessage('Too many matches, specify another filter')
          setCountries({})
        }
        else if (countriesFiltered.length > 1 && countriesFiltered.length <= 10) {
          setMessage(null)
          setCountries(countriesFiltered)
          setCountry(null)
        }
        else if (countriesFiltered.length === 1) {
          setCountry(countriesFiltered)
          setCountries({})
          const lat = countriesFiltered[0].latlng[0]
          const lon = countriesFiltered[0].latlng[1]
          axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily,minutely&appid=${apiKey}`)
            .then((response) => response.data)
            .then((weatherData) => 
              setWeather({capital: countriesFiltered[0].capital[0], ...weatherData })

            )
        }
      })
      .catch((error) => console.log(error))
  }




  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={onChange} />
        <Notice message={message} />
      </form>
      <ListCountry countries={countries} />
      <Country country={country} />
      <Weather weather={wheater} />
    </div>
  )
}

export default App