import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SearchFilter = ({ filter, onFilterChange}) => (
  <div>
    find countries
    <input value={filter} onChange={onFilterChange}/>
  </div>
)

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}<br/>
      Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="125" height="125"/>
    </div>
  )
}

const Countries = ({ countries }) => {
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
      {countries.map(country => <p key={country.name}>{country.name}</p>)}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])
  console.log('rendering', countries.length, 'countries')

  const shownCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      <Countries countries={shownCountries} />
    </div>
    
  )
}

export default App