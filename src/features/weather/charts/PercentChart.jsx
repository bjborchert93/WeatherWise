import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import numeral from 'numeral';
import { useUnits } from '../../../context/UnitsContext';
import { useWeatherData } from '../../../context/WeatherDataContext';
import {
  CartesianGrid,
  Area,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const PercentChart = () => {
  const theme = useTheme();
  const { units } = useUnits();
  const { weatherData } = useWeatherData();
  const weather = weatherData.weather;

  if (!weather || !weather.hourly) return null;

  const chartData = weather.hourly.map((item) => ({
    label: item.dt,
    precipChance: item.pop,
    cloudCover: item.clouds,
    humidity: item.humidity,
    pressure: item.pressure,
  }));

  return (
    <Box
      width={1500}
      height={280}
    >
      <ComposedChart
        width={1500}
        height={280}
        data={chartData}
        margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='label'
          tickFormatter={(value) => new Date(value * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
        />
        <YAxis
          yAxisId='precipChance'
          orientation='left'
          tickFormatter={(value) => value + '%'}
          padding={{ top: 30, bottom: 30 }}
        />
        <YAxis
          yAxisId='pressure'
          orientation='right'
          tickFormatter={(value) => (
            units.type === 'imperial'
              ? numeral(value * 0.02953).format('0.00') + ' inHg'
              : value + ' hPa'
          )}
        />
        <Tooltip
          labelFormatter={(label) => (
            `Time: ${new Date(label * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}`
          )}
          formatter={(value, name, props) =>
            [`${name}: ${numeral(value).format('0.00')}%`, '']}
          contentStyle={{
            backgroundColor: theme.palette.background.default,
            borderRadius: '5px'
          }}
        />
        <Legend verticalAlign='bottom' />
        <Line
          dataKey='humidity'
          name={`Humidity (%)`}
          stroke='#4AB700'
          strokeWidth={2}
          yAxisId='precipChance'
          dot={false}
        />
        <Line
          dataKey='pressure'
          name={`Pressure `}
          stroke='#000'
          strokeWidth={2}
          yAxisId='pressure'
          dot={false}
        />
        {/* <Area
          dataKey='cloudCover'
          name='Cloud Cover (%)'
          fill='rgb(53, 162, 235, 0.5)'
          stroke='rgb(53, 162, 235)'
          strokeWidth={2}
          dot={false}
        />
        <Area
          dataKey='precipChance'
          name='Precipitation Chance (%)'
          fill='#f5f5f5'
          stroke='#f5f5f5'
          strokeWidth={2}
          dot={false}
        /> */}
      </ComposedChart>
    </Box>
  )
}

export default PercentChart