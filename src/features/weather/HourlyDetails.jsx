import {
  useMediaQuery,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import WeatherIcon from './icons/WeatherIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { useUnits } from '../../context/UnitsContext';

const HourlyDetails = ({ weather }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { units } = useUnits();

  const MobileList = () => {
    return (
      <List
        sx={{
          mx: '2.5rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          gap: 2
        }}
      >
        {weather.hourly.map((hour, index) => {
          const { pop, snow } = hour;
          const icon = snow
            ? faSnowflake
            : faDroplet
          return (
            <ListItem key={index}>
              <Box
                sx={{
                  width: '3.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant='subtitle1'>
                  {new Date(hour.dt * 1000)
                    .toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                </Typography>
                <WeatherIcon size={2} icon={hour.weather[0]?.icon} />
                <Typography variant='subtitle1'>
                  {Math.round(hour.temp)}{units.degrees}
                </Typography>
                {pop
                  ? <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 1
                    }}
                  >
                    <FontAwesomeIcon icon={icon} size='1x' />
                    <Typography variant='body2'>{Math.round(pop * 100)}%</Typography>
                  </Box>
                  : null
                }
              </Box>
            </ListItem>
          )
        })}
      </List>
    )
  }

  const LargeScreenTable = () => {
    return (
      <Box
        sx={{ height: '100%', overflowY: 'auto' }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: '30rem' }}>
          <Table stickyHeader >
            <TableHead>
              <TableRow hover>
                <TableCell>Time</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Temp.</TableCell>
                <TableCell>Feels Like</TableCell>
                <TableCell>Precip</TableCell>
                <TableCell>Cloud Cover</TableCell>
                <TableCell>Dew Point</TableCell>
                <TableCell>Humidity</TableCell>
                <TableCell>Wind</TableCell>
                <TableCell>Pressure</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weather.hourly.map((hour, index) => {
                const { rain, snow } = hour;
                const rainPrecip = rain && rain['1h'] ? rain['1h'] : 0;
                const snowPrecip = snow && snow['1h'] ? snow['1h'] : 0;
                const precip = rainPrecip + snowPrecip;
                return (
                  <TableRow key={index} hover>
                    <TableCell>
                      {new Date(hour.dt * 1000)
                        .toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                    </TableCell>
                    <TableCell
                      sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}
                    >
                      <WeatherIcon size={2} icon={hour.weather[0]?.icon} />
                      <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
                        {hour.weather[0]?.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{Math.round(hour.temp)}{units.degrees} </TableCell>
                    <TableCell>{Math.round(hour.feels_like)}{units.degrees} </TableCell>
                    <TableCell>{precip ? `${precip} ${units.volume}` : `0 ${units.volume}`}</TableCell>
                    <TableCell>{hour.clouds}%</TableCell>
                    <TableCell>{Math.round(hour.dew_point)}{units.degrees}</TableCell>
                    <TableCell>{Math.round(hour.humidity)}%</TableCell>
                    <TableCell>{`${Math.round(hour.wind_speed)} ${units.wind} ${hour.wind_gust ? `(${Math.round(hour.wind_gust)} ${units.wind} gust)` : ''}`}</TableCell>
                    <TableCell>
                      {units.type === 'imperial'
                        ? `${Math.round(hour.pressure * 0.02953 * 10) / 10} inHg`
                        : `${Math.round(hour.pressure)} hPa`
                      }
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Typography variant='h5' sx={{ my: 2 }}>
        24-Hour Breakdown
      </Typography>
      <Card component={Paper} elevation={6} >
        <Divider />
        {isMobile
          ? <Box sx={{ width: '88vw', overflowX: 'scroll' }}>
            <MobileList />
          </Box>
          : <LargeScreenTable />
        }
      </Card>
    </Box>
  )
}

export default HourlyDetails