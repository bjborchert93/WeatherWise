import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getWeather } from '../../api/weatherApi';
import { useGeolocation } from '../../context/GeolocationContext';

import { Box, Grid } from '@mui/material';

import CurrentWeather from './CurrentWeather';
import ForecastByDay from './ForecastByDay';
import MinutelyPrecipWidget from '../../widgets/MinutelyForecastWidget';

const WeatherHome = () => {
  const coords = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const {
    isLoading,
    isError,
    error,
    data: weatherData,
  } = useQuery('weather', () => getWeather(coords, 'imperial'), { staleTime: 60 * 1000 * 5 });

  useEffect(() => {
    if (weatherData) {
      setWeather(weatherData.weather);
      setLocation(weatherData.location[0]);
    }
  }, [weatherData]);

  console.log(weatherData);

  if (isLoading) {
    {/* insert spinner/skeleton here */ }
  } else if (isError) {
    {/* error to display */ }
  } else {

  }

  return (
    <>
      {!isLoading && weather
        ? <Grid container spacing={2}>
          <Grid item sm={12} md={5}>
            <CurrentWeather weather={weather} location={location} />
          </Grid>
          <Grid item sm={12} md={7}>
            <Box sx={{ width: '100%', height: '100%' }}>
              <MinutelyPrecipWidget weather={weather} />
            </Box>
          </Grid>
          <Grid item sm={12} >
            <ForecastByDay dailyForecast={weather} />
          </Grid>
        </Grid>
        :
        null}
    </>
  )
}

export default WeatherHome