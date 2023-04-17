import { Grid } from '@mui/material';
import HourlyChart from "./HourlyChart";
import HourlyDetails from "./HourlyDetails";

const HourlyForecast = () => {
  return (
    <Grid container>
      <Grid item sm={12} md={6}>
        <HourlyChart />
      </Grid>
      <Grid item sm={12} md={6}>
        <HourlyDetails />
      </Grid>
    </Grid>
  )
}

export default HourlyForecast