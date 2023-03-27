import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const WindWidget = ({ weather }) => {
  const theme = useTheme();
  const degree = weather.current.wind_deg;
  const iconStyle = { transform: `rotate(${degree - 45 - 180}deg)` }
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degree % 360) / 22.5);

  return (
    <Box
      component={Paper}
      elevation={9}
      sx={{
        height: '9rem',
        width: '9rem',
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
      <Typography variant='subtitle1'>
        {directions[index]} | {Math.round(weather.current.wind_speed)}mph
      </Typography>
      <FontAwesomeIcon icon={faLocationArrow} style={iconStyle} size='2x' />
      <Typography variant='subtitle2' fontStyle='italic'>
        Gusts {Math.round(weather.daily[0]?.wind_gust)}mph
      </Typography>
    </Box>
  )
}

export default WindWidget;