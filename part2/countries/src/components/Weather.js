import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({lat, long, capital}) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`)
    .then((response) => {
      setWeather(response.data);
    });
  }, [lat, long])

  if (weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <div>temperature {weather.main.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
             alt={weather.weather[0].description}/>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    );
  }
}

export default Weather;