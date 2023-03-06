import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/Layout/DashLayout';

import Layout from './components/Layout/Layout';
import CurrentWeather from './features/weather/CurrentWeather';
import Welcome from './Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route path='/dash' element={<DashLayout/>} >
          <Route index element={<Welcome />} />
          <Route path='/dash/current' element={<CurrentWeather />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App