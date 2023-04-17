import { useTheme } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import { Box } from '@mui/material';
import numeral from 'numeral';
import { useUnits } from '../../../context/UnitsContext';
import { useWeatherData } from '../../../context/WeatherDataContext';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceArea,
} from 'recharts';

const TemperatureChart = () => {
  const theme = useTheme();
  const { units } = useUnits();
  const { weatherData } = useWeatherData();
  const weather = weatherData.weather;

  if (!weather || !weather.hourly) return null;

  // const sunrise = [weather.daily[0].sunrise, weather.daily[1].sunrise];
  // const sunset = [weather.daily[0].sunset, weather.daily[1].sunset];

  const chartData = weather.hourly.map((item) => ({
    label: item.dt,
    temperature: item.temp,
    feelsLike: item.feels_like,
    dewPoint: item.dew_point,
    // isDaytime: item.dt >= sunrise[0] && item.dt <= sunset[0] ||
    //   item.dt >= sunrise[1] && item.dt <= sunset[1]
  }));

  // console.log(chartData)

  // const areas = [];
  // let lastIsDaytime = chartData[0].isDaytime;
  // let areaStartIndex = 0;
  // for (let i = 1; i < chartData.length; i++) {
  //   if (chartData[i].isDaytime !== lastIsDaytime) {
  //     areas.push({
  //       x1: areaStartIndex - 0.5,
  //       x2: i - 0.5,
  //       isDaytime: lastIsDaytime
  //     });
  //     areaStartIndex = i;
  //     lastIsDaytime = chartData[i].isDaytime;
  //   }
  // }
  // areas.push({
  //   x1: areaStartIndex - 0.5,
  //   x2: chartData.length - 0.5,
  //   isDaytime: lastIsDaytime
  // });

  // const filteredAreas = areas.filter(area => !area.isDaytime);
  // const nighttimeAreas = filteredAreas.slice(0, 2);

  // console.log(nighttimeAreas);

  // const areas = [];
  // let lastIsDaytime = chartData[0].isDaytime;
  // let areaStartIndex = 0;
  // for (let i = 1; i < chartData.length; i++) {
  //   if (chartData[i].isDaytime !== lastIsDaytime) {
  //     areas.push({
  //       startIndex: areaStartIndex,
  //       endIndex: i,
  //       isDaytime: lastIsDaytime
  //     });
  //     areaStartIndex = i;
  //     lastIsDaytime = chartData[i].isDaytime;
  //   }
  // }
  // areas.push({
  //   startIndex: areaStartIndex,
  //   endIndex: chartData.length,
  //   isDaytime: lastIsDaytime
  // });

  // const nighttimeAreas = areas.filter(area => !area.isDaytime);


  return (
    <Box width={1500} height={280}>
      <ComposedChart
        width={1500}
        height={280}
        data={chartData}
        margin={{ top: 20, right: 50, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='label'
          // tick={false}
          tickFormatter={(value) => new Date(value * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
        />
        <YAxis
          yAxisId='temperature'
          orientation='left'
          tickFormatter={(value) => value + units.degrees}
          padding={{ top: 30, bottom: 30 }}
        />
        <Tooltip
          labelFormatter={(label) => (
            `Time: ${new Date(label * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}`
          )}
          formatter={(value, name, props) =>
            [`${name}: ${numeral(value).format('0.00')}${units.degrees}`, '']}
          contentStyle={{
            backgroundColor: theme.palette.background.default,
            borderRadius: '5px'
          }}
        />
        <Legend verticalAlign='bottom' />
        <Line
          dataKey='feelsLike'
          name={`Feels Like (${units.degrees})`}
          stroke='#f0f'
          strokeWidth={2}
          yAxisId='temperature'
          dot={false}
        />
        <Line
          dataKey='dewPoint'
          name={`Dew Point (${units.degrees})`}
          stroke={lightGreen[500]}
          strokeWidth={2}
          yAxisId='temperature'
          dot={false}
        />
        <Line
          dataKey='temperature'
          name={`Temperature (${units.degrees})`}
          stroke={theme.palette.error.main}
          strokeWidth={2}
          yAxisId='temperature'
          dot={false}
        />
        {/* <ReferenceArea
          x1={chartData[0].label}
          x2={chartData[9].label}
          y1={0}
          y2={40}
          stroke='red'
          strokeOpacity={0.3}
          ifOverflow='hidden'
        /> */}

      </ComposedChart>
    </Box>
  );

}

export default TemperatureChart