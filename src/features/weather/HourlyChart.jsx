// import { useEffect, useState } from 'react';
// import ChartDataLabels from 'chartjs-plugin-crosshair';
// import {
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Legend,
//   Filler,
//   Tooltip,
//   LineController,
//   BarController,
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';
// import { useTheme } from '@mui/material/styles';
// import { Box, Paper, Typography } from '@mui/material';
// import WeatherIcon from './icons/WeatherIcon';
// import numeral from 'numeral';
// import { useUnits } from '../../context/UnitsContext';
// import { useWeatherData } from '../../context/WeatherDataContext';

// ChartJS.plugins.register(
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Legend,
//   Filler,
//   Tooltip,
//   LineController,
//   BarController,
//   ChartDataLabels
// );

// // ChartJS.plugins.register(ChartDataLabels)

// const HourlyChart = () => {
//   const [data, setData] = useState(null);
//   const theme = useTheme();
//   const { units } = useUnits();
//   const { weatherData } = useWeatherData();
//   const weather = weatherData.weather;

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         // display: false
//       },
//       crosshair: {
//         line: {
//           color: theme.palette.grey[700],
//           width: 1,
//           dashPattern: [5, 5],
//         },
//         zoom: {
//           enabled: false,
//         },
//         snap: {
//           enabled: true,
//         },
//         callbacks: {
//           label: function (tooltipItem) {
//             return numeral(tooltipItem.yLabel).format('0.00');
//           },
//         },
//       },
//     },
//     scales: {
//       temperature: {
//         type: 'linear',
//         position: 'left',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return value + units.degrees;
//           }
//         },
//         grid: { display: false },
//         // suggestedMin: units.type === 'imperial' ? -40 : -10,
//         // suggestedMax: units.type === 'imperial' ? 110 : 45,
//       },
//       feelsLike: {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return value + units.degrees;
//           }
//         },
//         grid: {
//           display: false
//         },
//         // suggestedMin: units.type === 'imperial' ? -40 : -10,
//         // suggestedMax: units.type === 'imperial' ? 110 : 45,
//       },
//       humidity: {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return value + '%'
//           }
//         },
//         grid: {
//           display: false,
//         },
//         // suggestedMin: 0
//       },
//       pressure: {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return units.type === 'imperial'
//               ? value + ' inHg'
//               : value + ' hPa'
//           }
//         },
//       },
//       cloudCover: {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return value + '%'
//           }
//         },
//       },
//       precipChance: {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return value + '%'
//           }
//         },
//       },
//       precipAmount: {
//         type: 'linear',
//         position: 'right',
//         ticks: {
//           beginAtZero: true,
//           callback: function (value) {
//             return numeral(value).format('0.00') + ' ' + units.volume
//           }
//         },
//         grid: {
//           display: false,
//         },
//         suggestedMin: 0,
//         suggestedMax: 100
//       }
//     }
//   };

//   useEffect(() => {
//     if (weather && weather.minutely) {
//       const labels = weather.hourly
//         .map((item) =>
//           new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
//         );

//       const chartData = {
//         labels: labels,
//         datasets: [
//           {
//             type: 'line',
//             label: `Temperature (${units.degrees})`,
//             borderColor: theme.palette.error.main,
//             borderWidth: 2,
//             fill: false,
//             data: weather.hourly
//               .map((item) => Math.round(item.temp)),
//             yAxisID: 'temperature',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//           {
//             type: 'line',
//             label: `Feels Like (${units.degrees})`,
//             borderColor: '#f0f',
//             borderWidth: 2,
//             fill: false,
//             data: weather.hourly
//               .map((item) => Math.round(item.feels_like)),
//             yAxisID: 'feelsLike',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//           {
//             type: 'line',
//             label: `Pressure (${units.type === 'imperial' ? 'inHg' : 'hPa'}`,
//             data: weather.hourly.map((item) => (
//               units.type === 'imperial'
//                 ? numeral(item.pressure * 0.02953).format('0.00')
//                 : numeral(item.pressure).format('0.00')
//             )),
//             borderColor: '#000',
//             backgroundColor: '#000',
//             borderWidth: 2,
//             yAxisID: 'pressure',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//           {
//             type: 'line',
//             label: `Humidity (${units.type === 'imperial' ? 'inHg' : 'hPa'}`,
//             data: weather.hourly.map((item) => item.humidity),
//             borderColor: '#4AB700',
//             backgroundColor: '#4AB700',
//             borderWidth: 2,
//             yAxisID: 'humidity',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//           {
//             type: 'bar',
//             label: `Precipitation Amount (${units.volume})`,
//             data: weather.hourly.map((item) => {
//               const snow = item.snow ? item.snow['1h'] || 0 : 0;
//               const rain = item.rain ? item.rain['1h'] || 0 : 0;
//               return snow + rain;
//             }),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgb(53, 162, 235)',
//             yAxisID: 'precipAmount',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//           {
//             type: 'line',
//             fill: true,
//             label: 'Chance of Precipitation (%)',
//             data: weather.hourly.map((item) => item.pop * 100),
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgb(53, 162, 235, .5)',
//             borderWidth: 2,
//             yAxisID: 'precipChance',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//           {
//             type: 'line',
//             fill: true,
//             label: 'Cloud Cover (%)',
//             data: weather.hourly.map((item) => item.clouds * 100),
//             borderColor: 'rgb(164, 164, 164)',
//             backgroundColor: 'rgb(164, 164, 164, .5)',
//             borderWidth: 2,
//             yAxisID: 'cloudCover',
//             tension: 0.4,
//             pointRadius: 0,
//           },
//         ],
//       };
//       setData(chartData);
//     }
//   }, [weather, theme.palette.primary.main]);

//   if (data) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Typography variant='h5' >
//           Hourly Forecast
//         </Typography>
//         <Box
//           component={Paper}
//           elevation={3}
//           sx={{ my: 2, p: 1, overflowX: 'auto' }}
//         >
//           <Box sx={{ width: '88vw', minWidth: '120rem', maxHeight: '30rem' }}>
//             <Chart data={data} options={options} height={400} />
//           </Box>
//         </Box>
//       </Box>
//     )
//   }
// };


// export default HourlyChart;


import { useTheme } from '@mui/material/styles';
import { Box, Card, Paper, Typography } from '@mui/material';
import TemperatureChart from './charts/TemperatureChart';
import PercentChart from './charts/PercentChart';

const HourlyChart = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h5' sx={{ my: 2 }}>
        Hourly Forecast
      </Typography>
      <Card 
        component={Paper} 
        elevation={6}
        sx={{
          p: 2,
          height: 800,
          overflowX: 'auto',
          position: 'relative'
        }}
      >
        <TemperatureChart />
        <PercentChart />
      </Card>
    </Box>
  );
};

export default HourlyChart;
