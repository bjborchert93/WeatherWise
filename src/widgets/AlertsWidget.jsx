import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { useWeatherData } from '../context/WeatherDataContext';

const AlertsWidget = () => {
  const theme = useTheme();
  const { weatherData } = useWeatherData();
  const weather = weatherData.weather;

  let content
  if (!weather.alerts) {
    content = null;
  } else {
    content = (
      <Box component={Paper} elevation={6} sx={{ m: 2 }}>
        {weather.alerts?.map((alert, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <WarningIcon color={theme.palette.error.main} sx={{ mr: 1 }} />
              <Typography variant='h6' fontWeight={600} color={theme.palette.error.main}>
                {alert.event}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='subtitle2' mb={2}>From: {alert.sender_name}</Typography>
              <Typography variant='subtitle2' mb={2}>Begins: {format(new Date(alert.start * 1000), 'EEEE, MMM do h:mm b')}</Typography>
              <Typography variant='subtitle2' mb={2}>Ends: {format(new Date(alert.end * 1000), 'EEEE, MMM do h:mm b')}</Typography>
              <Typography variant='body1'>
                {alert.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    )
  }

  return content
}

export default AlertsWidget