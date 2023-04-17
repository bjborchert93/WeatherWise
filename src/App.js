import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/Layout/DashLayout';
import NavBar from './components/Layout/NavBar';

import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { lightTheme, darkTheme } from './theme/Theme';
import Layout from './components/Layout/Layout';
import CurrentWeather from './features/weather/CurrentWeather';
import Welcome from './Welcome';
import WeatherHome from './features/weather/WeatherHome';
import { UnitsProvider } from './context/UnitsContext';
import { WeatherDataProvider } from './context/WeatherDataContext';
import HourlyForecast from './features/weather/HourlyChart';
import DailyForecast from './features/weather/DailyForecast';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <UnitsProvider>
      <WeatherDataProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route path='/weather' element={<DashLayout />} >
                <Route index element={<Welcome />} />
                <Route path='/weather/minutely' element={<WeatherHome />} />
                <Route path='/weather/hourly' element={<HourlyForecast />} />
                <Route path='/weather/daily' element={<DailyForecast/>} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </WeatherDataProvider>
    </UnitsProvider>
  );
}

export default App