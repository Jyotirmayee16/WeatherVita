import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';

const WeatherDisplay = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = '6783c6f371512588b3e482f47e68fd4d';

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        setLoading(true);

        try {
          const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
          const response = await axios.get(apiUrl, {
            params: {
              q: location,
              units: 'metric',
              appid: apiKey,
            },
          });

          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [location, apiKey]);

  return (
    <div id="weather-display">
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <div>
          <h2>Weather in {location}, {weatherData.sys.country}</h2>
          <div>Temperature: {weatherData.main.temp}°C</div>
          <div>Humidity: {weatherData.main.humidity}%</div>
          <div>
            <strong>Conditions:</strong> {weatherData.weather[0].description}
          </div>
        </div>
      ) : (
        <p>Location not found. Please check your input.</p>
      )}
    </div>
  );
      };
      export default WeatherDisplay;