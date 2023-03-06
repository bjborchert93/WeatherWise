import { Link } from 'react-router-dom';
import { useGeolocation } from './context/GeolocationContext'

const Welcome = () => {
  const coords = useGeolocation();
  console.log(coords);
  return (
    <>
      {!coords
        ? <p>Loading...</p>
        : <p>{`Your coordinates are ${coords.latitude}, ${coords.longitude}`}</p>
      }
      <Link to='/dash/current' >Get Current Weather</Link>
    </>
  )
}

export default Welcome