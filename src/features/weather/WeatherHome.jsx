import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getWeatherByCoords } from '../../api/weatherApi';
import { useGeolocation } from '../../context/GeolocationContext';
import { useUnits } from '../../context/UnitsContext';

import { Box, Grid } from '@mui/material';

import CurrentWeather from './CurrentWeather';
import ForecastByDay from './ForecastByDay';
import HourlyChart from './HourlyChart';
import AlertsWidget from '../../widgets/AlertsWidget';
import HourlyDetails from './HourlyDetails';

const WeatherHome = () => {
  const coords = useGeolocation();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const { units } = useUnits();

  const {isLoading, isError, error, data: weatherData} = useQuery({
    queryKey: ['weather', {coords, units}],
    queryFn: () => getWeatherByCoords(coords, units),
    staleTime: 60 * 1000 * 5, 
    refetchOnWindowFocus: false,
  });

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
        ? <Grid container>
          <Grid item sm={12}>
            <AlertsWidget weather={weather} />
          </Grid>
          <Grid item sm={12} md={5}>
            <CurrentWeather weather={weather} location={location} />
          </Grid>
          <Grid item sm={12} md={7}>
            <HourlyChart weather={weather} />
          </Grid>
          <Grid item sm={12}>
            <HourlyDetails weather={weather} />
          </Grid>
          <Grid item sm={12}>
            <ForecastByDay weather={weather} />
          </Grid>
        </Grid>
        :
        null}
    </>
  )
}

export default WeatherHome