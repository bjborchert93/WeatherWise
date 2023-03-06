import { useQuery, useQueryClient } from 'react-query';
import { getWeather } from '../../api/weatherApi';
import { useGeolocation } from '../../context/GeolocationContext';
import { useState } from 'react';

const CurrentWeather = () => {
  // const [ weather, setWeather ] = useState({})
  // const queryClient = useQueryClient();
  const coords = useGeolocation();

  const {
    isLoading,
    isError,
    error,
    data: currentWeather,
  } = useQuery('weather', () => getWeather(coords), {staleTime: 1000 * 60 * 5 });

let content
if (isLoading) {
  content = <p>Loading...</p>
} else if (isError) {
  content = <p>{error.message}</p>
} else {
  console.log(currentWeather)
  content = JSON.stringify(currentWeather);
}

  return (
    <section>
      {content}
    </section>
  )
}

export default CurrentWeather