import { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { useUnits } from '../../context/UnitsContext';

const UnitsToggle = () => {
  const { units, toggleUnits } = useUnits();

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
        value={units.type}
        onChange={toggleUnits}
      >
        <ToggleButton value='imperial'>
          <Typography variant='subtitle1' color='primary'>
            Imperial (°F / mph)
          </Typography>
        </ToggleButton>
        <ToggleButton value='metric'>
          <Typography variant='subtitle1' color='primary'>
            Metric (°C / m/s)
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

export default UnitsToggle