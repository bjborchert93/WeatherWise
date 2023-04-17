import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import WeatherIcon from './icons/WeatherIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faSnowflake, faGauge } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import { useUnits } from '../../context/UnitsContext';
import { useWeatherData } from '../../context/WeatherDataContext';

const DailyForecast = () => {
  // const theme = useTheme();
  const { units } = useUnits();
  const { weatherData } = useWeatherData();
  const weather = weatherData.weather;

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Typography variant='h5' sx={{ my: 2 }} >
        8 Day Forecast
      </Typography>
      <Card
        component={Paper}
        elevation={6}
      >
        <Box>
          {weather?.daily?.map((day, index) => {
            const { pop, rain, snow } = day;
            const accumulation = (rain / 25.4) + (snow / 25.4);
            const icon = snow
              ? faSnowflake
              : faDroplet
            return (
              <Accordion key={index} defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <Grid container>
                    <Grid item >
                      <Typography variant='h5'>
                        {index === 0 ? 'Today' : format(new Date(day.dt * 1000), 'EEEE, MMM do')}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <WeatherIcon size={2} icon={day.weather[0]?.icon} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='subtitle1'>
                          {Math.floor(day.temp.max)}° / {Math.floor(day.temp.min)}°
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant='subtitle1' align='right'>
                        {day.weather[0]?.description}
                      </Typography>
                    </Grid> */}
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      m: 3,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box sx={{ width: '20%' }}>
                      <WeatherIcon size={3} icon={day.weather[0]?.icon} />
                    </Box>
                    <Box>
                      <Typography variant='subtitle2' fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                        {day.weather[0]?.description}
                      </Typography>
                      <Typography variant='subtitle2'>
                        {`The high will be ${Math.round(day.temp.max)}${units.degrees}`}.
                        {` The low will be ${Math.round(day.temp.min)}${units.degrees}`}.
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    sx={{ borderLeft: '2px solid red', p: 2 }}
                    component={Paper}
                    square
                    elevation={6}
                  >
                    <Grid
                      container
                      spacing={3}
                      sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center' }}
                    >
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center' }}
                      >
                        <FontAwesomeIcon icon={icon} />
                        <Typography variant='subtitle2'>
                          {Math.round(pop * 100)}% / {numeral(accumulation).format('0.0') || 0} {units.volume}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        <WindDirectionIcon degree={day.wind_deg} size={1} speed={day.wind_speed} />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center' }}
                      >
                        <FontAwesomeIcon icon={faGauge} />
                        <Typography variant='subtitle2'>
                          {units.type === 'imperial'
                            ? `${Math.round(weather.current.pressure * 0.02953 * 10) / 10} inHg`
                            : `${Math.round(weather.current.pressure)} hPa`
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        Humidity: {day.humidity}%
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        UV Index: {Math.round(day.uvi)}
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        Dew Point: {Math.round(day.dew_point)} {units.degrees}
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        Sunrise: {new Date(day.sunrise * 1000)
                          .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                      </Grid>
                      <Grid item xs={6} sm={4} md={3}>
                        Sunset: {new Date(day.sunset * 1000)
                          .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container>
                    <Grid item xs={6} md={3}
                      sx={{ p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Typography variant='h6' sx={{ pb: 3 }}>Morning</Typography>
                      <Typography variant='h4'>{Math.round(day.temp.morn)}{units.degrees}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}
                      sx={{ p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Typography variant='h6' sx={{ pb: 3 }}>Afternoon</Typography>
                      <Typography variant='h4'>{Math.round(day.temp.day)}{units.degrees}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}
                      sx={{ p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Typography variant='h6' sx={{ pb: 3 }}>Evening</Typography>
                      <Typography variant='h4'>{Math.round(day.temp.eve)}{units.degrees}</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}
                      sx={{ p: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Typography variant='h6' sx={{ pb: 3 }}>Night</Typography>
                      <Typography variant='h4'>{Math.round(day.temp.night)}{units.degrees}</Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Box>
      </Card>
    </Box>

  )
}

export default DailyForecast