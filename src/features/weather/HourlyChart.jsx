import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Filler,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
import WeatherIcon from './icons/WeatherIcon';
import numeral from 'numeral';
import { useUnits } from '../../context/UnitsContext';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Filler,
  Tooltip,
  LineController,
  BarController,
);

const HourlyChart = ({ weather }) => {
  const [data, setData] = useState(null);
  const theme = useTheme();
  const { units } = useUnits();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
            return value + units.degrees;
          }
        },
        grid: {
          display: false
        },
        suggestedMin: 0
      },
      precipChance: {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return Math.round(value * 100) + '%'
          }
        },
      },
      precipAmount: {
        type: 'linear',
        position: 'right',
        fill: 'origin',
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return numeral(value).format('0.00') + ' ' + units.volume
          }
        },
        grid: {
          display: false,
        },
        suggestedMin: 0
      }
    }
  };

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
            label: `Temperature (${units.degrees})`,
            borderColor: theme.palette.error.main,
            borderWidth: 2,
            fill: false,
            data: weather.hourly
              .map((item) => Math.round(item.temp)),
            yAxisID: 'temperature',
            tension: .2,
          },
          {
            type: 'bar',
            label: 'Chance of Precipitation (%)',
            data: weather.hourly
              // .slice(0, 24)
              .map((item) => item.pop),
            backgroundColor: theme.palette.primary.main,
            borderWidth: 1,
            yAxisID: 'precipChance'
          },
          {
            type: 'line',
            fill: true,
            label: 'Precipitation Amount (in.)',
            data: weather.hourly.map((item) => {
              const snow = item.snow ? item.snow['1h'] || 0 : 0;
              const rain = item.rain ? item.rain['1h'] || 0 : 0;
              return snow + rain;
            }),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',
            yAxisID: 'precipAmount',
            tension: 0.4,
          }
        ],
      };
      setData(chartData);
    }
  }, [weather, theme.palette.primary.main]);

  if (data) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant='h5' >
          Hourly Forecast
        </Typography>
        <Box
          component={Paper}
          elevation={3}
          sx={{ my: 2, p: 1, overflowX: 'auto' }}
        >
          <Box sx={{ width: '88vw', minWidth: '120rem', maxHeight: '30rem' }}>
            <Chart data={data} options={options} height={400} />
          </Box>
        </Box>
      </Box>
    )
  }
};


export default HourlyChart;