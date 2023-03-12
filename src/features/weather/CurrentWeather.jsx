import { useQuery } from 'react-query';
import { getWeather } from '../../api/weatherApi';
import { useGeolocation } from '../../context/GeolocationContext';
import { Box, Card, Grid, Paper, Typography } from '@mui/material';
// import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import WeatherIcon from './icons/WeatherIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';

const CurrentWeather = () => {
  // const [weather, setWeather] = useState({})
  const theme = useTheme();
  const coords = useGeolocation();

  const {
    isLoading,
    isError,
    error,
    data: currentWeather,
  } = useQuery('weather', () => getWeather(coords, 'imperial'), { staleTime: 60 * 1000 * 5 });

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = <p>{error.message}</p>
  } else {
    console.log(currentWeather)
    // setWeather({ ...weather, currentWeather})
    content = JSON.stringify(currentWeather)
  }

  return (
    <>
      {content &&
        <Card
          component={Paper}
          elevation={6}
          sx={{
            m: 2,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid container>
            <Grid item sm={12}>
              {/* <Typography variant='h3' align='center' fullWidth >{currentWeather.current}</Typography> */}
            </Grid>
            <Grid item sm={12} md={4}>
              <Box sx={{ m: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <WeatherIcon
                  icon={currentWeather?.current?.weather[0]?.icon}
                  size='8x'
                />
              </Box>
              <Typography variant='h4' align='center' sx={{ textTransform: 'capitalize' }}>
                {currentWeather?.current?.weather[0]?.description}
              </Typography>
            </Grid>
            <Grid item sm={12} md={4}>
              <Typography variant='h1' align='center'>
                {Math.round(currentWeather?.current?.temp)}°
              </Typography>
              <Typography variant='h6' fontStyle='italic' align='center'>
                Feels like {Math.round(currentWeather?.current?.feels_like)}°
              </Typography>
            </Grid>
            <Grid item sm={12} md={4}>
              <Box sx={{ m: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <WindDirectionIcon size='5x' degree={currentWeather?.current?.wind_deg} />
              </Box>
            </Grid>
          </Grid>
        </Card>}
    </>
  )
}

export default CurrentWeather