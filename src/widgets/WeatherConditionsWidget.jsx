import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WeatherIcon from '../features/weather/icons/WeatherIcon';

const WeatherConditionsWidget = ({ weather }) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      elevation={9}
      sx={{
        height: '9rem',
        width: '9rem',
        px: 2,
        py: 5,
        my: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        border: `4px solid ${theme.palette.primary.main}`,
        borderRadius: '50%'
      }}
    >
      <WeatherIcon
        icon={weather.current.weather[0]?.icon}
        size={3}
      />
      <Typography variant='subtitle2' align='center' sx={{ textTransform: 'capitalize' }}>
        {weather.current.weather[0]?.description}
      </Typography>
    </Box>
  )
}

export default WeatherConditionsWidget;