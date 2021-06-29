import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SearchFilter = ({ filter, onFilterChange}) => (
  <div>
    find countries
    <input value={filter} onChange={onFilterChange}/>
  </div>
)

const WeatherForecast = ({ forecast }) => {
  if (forecast === '') return (<></>)

    return (
      <div>
         <p><b>Temperature:</b> {forecast.main.temp} °C</p>
         <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].description}></img>
         <p><b>Wind:</b> {forecast.wind.speed} m/s, direction {forecast.wind.direction} degrees</p>
      </div>
     )
}

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState('')
  
  const hook = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      console.log('forecast promise fulfilled')
      setWeather(response.data)
    })
  }

  useEffect(hook, [country.capital])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}<br/>
      Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="200" height="125" alt={`${country.name} flag`}/>
      <h3>Weather in {country.capital}</h3>
      <WeatherForecast forecast={weather}/>
    </div>
  )
}

const CountryPreview = ({ countryName, onClick }) => (
  <div>
    {countryName}
    <button onClick={onClick}>show</button>
  </div>
)

const Countries = ({ countries, onCountryClick }) => {

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  return (
    <div>
      {countries.map(country => <CountryPreview key={country.name} countryName={country.name} onClick={() => onCountryClick(country)} />)}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [inspectedCountry, setInspectedCountry] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setInspectedCountry('')
  }

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('countries data promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])
  console.log('rendering', countries.length, 'countries')

  const shownCountries = inspectedCountry === ''
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : [inspectedCountry]

  return (
    <div>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      <Countries countries={shownCountries} onCountryClick={(country) => setInspectedCountry(country)}/>
    </div>
  )
}

export default App