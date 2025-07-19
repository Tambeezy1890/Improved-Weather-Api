import { useState, useEffect } from 'react';
import DisplayCard from './DisplayCard';

function WeatherCards() {
  const [search, setSearch] = useState('');
  const [addCity, setAddCity] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  // Fetch data whenever a new city is added
  useEffect(() => {
    if (addCity.length === 0) return;

    const latestCity = addCity[addCity.length - 1];

    const apiKey = `${import.meta.env.VITE_WEATHER_API_KEY}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${latestCity}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid city name');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(prev => [...prev, data]); // add latest weather data
      })
      .catch((error) => {
        console.warn(error.message);
        setAddCity(prev => prev.slice(0, -1)); // remove last added city
      });

  }, [addCity]);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function isSearchValid() {
    if (search.trim() !== '') {
      setAddCity(prev => [...prev, search.trim()]);
      setSearch('');
    }
  }

  function removeCity(indexToRemove) {
    setAddCity(prev => prev.filter((_, i) => i !== indexToRemove));
    setWeatherData(prev => prev.filter((_, i) => i !== indexToRemove));
  }

  return (
    <div className='card-container'>
        <div className='search-bar'>
            <input
        type="text"
        placeholder="Enter a city"
        value={search}
        onChange={handleSearch}
      />
      <button onClick={isSearchValid} type="search">Search</button>
        </div>
      
    <div className='details'>
        <ul>
        {weatherData.map((data, index) => (
          <li key={index} onClick={() => removeCity(index)}>
            <DisplayCard data={data} />
          </li>
        ))}
      </ul>
    </div>
      
    </div>
  );
}

export default WeatherCards;
