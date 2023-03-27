import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
import WeatherIcon from './icons/WeatherIcon';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      // position: 'bottom',
      display: false
    },
  },
  scales: {
    temperature: {
      type: 'linear',
      position: 'left',
      ticks: {
        beginAtZero: true,
        callback: function (value) {
          return value + '°F'
        }
      },
      grid: {
        display: false
      },
      suggestedMin: 0
    },
    precipitation: {
      type: 'linear',
      position: 'right',
      ticks: {
        beginAtZero: true,
        callback: function (value) {
          return Math.round(value * 100) + '%'
        }
      },
    }
  }
};

const HourlyChart = ({ weather }) => {
  const [data, setData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (weather && weather.minutely) {
      const labels = weather.hourly
        // .slice(0, 24)
        .map((item) =>
          new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
        );

      const chartData = {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'Temperature (°F)',
            borderColor: theme.palette.error.main,
            borderWidth: 2,
            fill: false,
            data: weather.hourly
              // .slice(0, 24)
              .map((item) => Math.round(item.temp)),
            yAxisID: 'temperature',
          },
          {
            type: 'bar',
            label: 'Chance of Precipitation (%)',
            data: weather.hourly
              // .slice(0, 24)
              .map((item) => item.pop),
            backgroundColor: theme.palette.primary.main,
            borderWidth: 1,
            yAxisID: 'precipitation'
          },
        ],
      };
      setData(chartData);
    }
  }, [weather, theme.palette.primary.main]);

  if (data) {
    return (
      <Box sx={{ p: 2 }} height={'10rem'}>
        <Typography variant='h5' >Hourly Forecast</Typography>
        <Box
          component={Paper}
          elevation={3}
          sx={{ my: 2, p: 1, overflowX: 'auto' }}
        >
          {/* <Box sx={{ minWidth: '50rem', maxHeight: '15rem' }}> */}
          <Chart data={data} options={options} width={'100%'} height={'50rem'} />
          {/* </Box> */}
        </Box>
      </Box>
    )
  }
};


export default HourlyChart;