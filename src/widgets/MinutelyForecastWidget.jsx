import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const MinutelyPrecipWidget = ({ weather }) => {
  const [data, setData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (weather && weather.minutely) {
      const labels = weather.minutely.map((item) =>
        new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
      );
      const minutelyData = weather.minutely.map((item) => item.precipitation);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Chance of Precipitation (%)',
            data: minutelyData,
            backgroundColor: theme.palette.primary.main,
            borderWidth: 1,
          },
        ],
      };
      setData(chartData);
    }
  }, [weather, theme.palette.primary.main]);

  return data && <Bar data={data} options={options} />;
};


export default MinutelyPrecipWidget;