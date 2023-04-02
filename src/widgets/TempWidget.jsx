import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUnits } from '../context/UnitsContext';

const TempWidget = ({ weather }) => {
  const theme = useTheme();
  const { units } = useUnits();
  
  return (
    <Box
      component={Paper}
      elevation={9}
      sx={{
        height: '12rem',
        width: '12rem',
        py: 5,
        my: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        border: `4px solid ${theme.palette.primary.main}`,
        borderRadius: '50%'
      }}
    >
      <Typography variant='subtitle2'>
        H:{Math.round(weather.daily[0].temp.max)}° | L:{Math.round(weather.daily[0].temp.min)}°
      </Typography>
      <Typography variant='h2' align='center'>
        {Math.round(weather.current.temp)}°
      </Typography>
      <Typography variant='subtitle2' fontStyle='italic'>
        Feels like {Math.round(weather.current.feels_like) + units.degrees}
      </Typography>
    </Box>
  )
}

export default TempWidget;