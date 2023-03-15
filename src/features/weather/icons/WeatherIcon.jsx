import { Box, Card, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudShowersHeavy, faSnowflake, faMoon, faCloudMoon, faCloudMoonRain, faBolt, faWind } from '@fortawesome/free-solid-svg-icons';

function WeatherIcon({ icon, size }) {

  const iconMap = {
    '01d': faSun, // clear sky (day)
    '02d': faCloudSun, // few clouds (day)
    '03d': faCloud, // scattered clouds (day)
    '04d': faCloud, // broken clouds (day)
    '09d': faCloudShowersHeavy, // shower rain (day)
    '10d': faCloudSun, // rain (day)
    '11d': faBolt, // thunderstorm (day)
    '13d': faSnowflake, // snow (day)
    '50d': faWind, // mist (day)
    '01n': faMoon, // clear sky (night)
    '02n': faCloudMoon, // few clouds (night)
    '03n': faCloud, // scattered clouds (night)
    '04n': faCloud, // broken clouds (night)
    '09n': faCloudShowersHeavy, // shower rain (night)
    '10n': faCloudMoonRain, // rain (night)
    '11n': faBolt, // thunderstorm (night)
    '13n': faSnowflake, // snow (night)
    '50n': faWind, // mist (night)
  };

  const selectedIcon = iconMap[icon];

  return (
    <Box>
      <FontAwesomeIcon icon={selectedIcon} size={`${size}x`} />
    </Box>
  )
}

export default WeatherIcon;
