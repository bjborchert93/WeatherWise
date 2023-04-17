import { useWeatherData } from '../../context/WeatherDataContext';

import { Box, Grid } from '@mui/material';

import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import AlertsWidget from '../../widgets/AlertsWidget';

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
          {/* <Grid item sm={12} md={7}>
            <HourlyChart />
          </Grid>
          <Grid item sm={12}>
            <HourlyDetails />
          </Grid> */}
          <Grid item sm={12}>
            <DailyForecast />
          </Grid>
        </Grid>
        : null}
    </>
  )
}

export default WeatherHome