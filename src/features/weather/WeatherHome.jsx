import { useWeatherData } from '../../context/WeatherDataContext';

import { Box, Grid } from '@mui/material';

import CurrentWeather from './CurrentWeather';
import ForecastByDay from './ForecastByDay';
import HourlyChart from './HourlyChart';
import AlertsWidget from '../../widgets/AlertsWidget';
import HourlyDetails from './HourlyDetails';

const WeatherHome = () => {
  const { weatherData } = useWeatherData();

  console.log(weatherData);

  return (
    <>
      {weatherData
        ? <Grid container>
          <Grid item sm={12}>
            <AlertsWidget />
          </Grid>
          <Grid item sm={12} md={5}>
            <CurrentWeather />
          </Grid>
          <Grid item sm={12} md={7}>
            <HourlyChart />
          </Grid>
          <Grid item sm={12}>
            <HourlyDetails />
          </Grid>
          <Grid item sm={12}>
            <ForecastByDay />
          </Grid>
        </Grid>
        : null}
    </>
  )
}

export default WeatherHome