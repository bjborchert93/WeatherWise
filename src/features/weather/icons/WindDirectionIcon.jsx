import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography } from '@mui/material';
import { useUnits } from '../../../context/UnitsContext';

const WindDirectionIcon = ({ degree, size, speed }) => {
  const { units } = useUnits();
  const iconStyle = {
    transform: `rotate(${degree - 45}deg)`,
  };
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degree % 360) / 22.5);

  return (
    <Box >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
        <FontAwesomeIcon icon={faLocationArrow} style={iconStyle} size={`${size}x`} />
        <Typography variant='subtitle1'>
          {directions[index]} | {Math.floor(speed)} {units.wind}
        </Typography>
      </Box>
    </Box>
  );
};

export default WindDirectionIcon;
