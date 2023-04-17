import { Accordion, AccordionSummary, AccordionDetails, Box, Card, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WindWidget from '../../widgets/WindWidget';
import TempWidget from '../../widgets/TempWidget';
import WeatherConditionsWidget from '../../widgets/WeatherConditionsWidget';
import numeral from 'numeral';
import { format } from 'date-fns';
import HourlyChart from './HourlyChart';
import { useUnits } from '../../context/UnitsContext';
import { useWeatherData } from '../../context/WeatherDataContext';

const CurrentWeather = () => {
  const { weatherData } = useWeatherData();
  const location = weatherData.location[0];
  const weather = weatherData.weather;
  const theme = useTheme();
  const distanceInMeters = (meters) => {
    if (meters >= 1000) {
      const kilometers = meters / 1000;
      return numeral(kilometers).format('0.0') + 'km';
    } else {
      return meters + 'm';
    }
  }

  const dateTime = format(new Date(), 'MMM d, h:mm b')
  const { units } = useUnits();

  return (
    <>
      {weatherData &&
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant='h5' color={theme.palette.primary.main}>
              {location.name}, {location.state}, {location.country}
            </Typography>
            <Typography variant='subtitle1' color={grey[500]}>
              {numeral(location.lat).format('0.00')}° N, {numeral(location.lon).format('0.00')}° W
            </Typography>
          </Box>
          <Typography variant='subtitle2'>{dateTime}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1
            }}
          >
            <TempWidget weather={weather} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
              }}
            >
              <WeatherConditionsWidget weather={weather} />
              <WindWidget weather={weather} />
            </Box>
          </Box>

          <Card
            component={Paper}
            elevation={6}
            sx={{ my: 2, p: 2 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} lg={6}>
                <Typography variant='subtitle1'>
                  {units.type === 'imperial'
                    ? `Pressure: ${Math.round(weather.current.pressure * 0.02953 * 10) / 10} inHg`
                    : `Pressure: ${Math.round(weather.current.pressure)} hPa`
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant='subtitle1'>Humidity: {weather.current.humidity}%</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant='subtitle1'>UV: {Math.round(weather.current.uvi)}</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant='subtitle1'>Dew Point: {Math.round(weather.current.dew_point) + units.degrees}</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant='subtitle1'>Visibility: {distanceInMeters(weather.current.visibility)}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>}
    </>
  )
}

export default CurrentWeather