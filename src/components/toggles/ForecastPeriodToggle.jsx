import { useState } from 'react'
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForecastPeriodToggle = () => {
  const [forecast, setForecast] = useState('minutely');
  const navigate = useNavigate();

  const handleToggle = (event, newForecastPeriod) => {
    if (newForecastPeriod !== null) {
      setForecast(newForecastPeriod);
      navigate(`/weather/${newForecastPeriod}`);
    }
  }

  const toggleItems = [
    { text: 'Minutely', link: 'minutely' },
    { text: 'Hourly', link: 'hourly' },
    { text: 'Daily', link: 'daily' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ToggleButtonGroup
        color='secondary'
        exclusive
        size='small'
        value={forecast}
        onChange={handleToggle}
      >
        {toggleItems.map((item, key) => (
          <ToggleButton value={item.link} key={key}>
            <Typography variant='subtitle1' color='primary'>
              {item.text}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default ForecastPeriodToggle