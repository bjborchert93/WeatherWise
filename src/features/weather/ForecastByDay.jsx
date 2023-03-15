import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Grid, IconButton, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import WeatherIcon from './icons/WeatherIcon';

const ForecastByDay = ({ dailyForecast }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant='h5' sx={{ mb: 3 }}>8 Day Forecast</Typography>
      {dailyForecast?.daily?.map((day, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ mx: 3 }} />}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>
                    {format(new Date(day.dt * 1000), 'EEE, MMM do')}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
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
                </Grid>
              </Grid>
            </AccordionSummary>
          </Accordion>
        )
      })}
    </Box>
  )
}

export default ForecastByDay