import { createContext, useContext, useState, useEffect } from 'react';

const WeatherDataContext = createContext({});

export const WeatherDataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(() => {
    const storedWeather = localStorage.getItem('weatherData');
    return storedWeather ? JSON.parse(storedWeather) : null;
  });

  useEffect(() => {
    if (weatherData) {
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }
  }, [weatherData]);

  const updateWeatherData = (newData) => {
    setWeatherData(newData);
  }

  return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
      { children }
    </WeatherDataContext.Provider>
  )
};

export const useWeatherData = () => {
  const { weatherData, setWeatherData } = useContext(WeatherDataContext);
  return { weatherData, setWeatherData };
}