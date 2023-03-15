import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';

const AlertsWidget = ({ weather }) => {
  const theme = useTheme();

  let content
  if (!weather.alerts) {
    content = null;
  } else {
    content = (
      <Box component={Paper} elevation={6} sx={{ mb: 2}}>
        {weather.alerts?.map((alert, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <WarningIcon color={theme.palette.error.main} sx={{ mr: 1 }} />
              <Typography variant='subtitle1' color={theme.palette.error.main}>
                Alert! - {alert.event}
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