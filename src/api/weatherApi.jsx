import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'http://localhost:8000/weather',
})

export const getWeatherByCoords = async (coords, units) => {
  console.log(coords, units)
  const response = await weatherApi.get('/coords', {
    params: {
      coords: JSON.stringify(coords),
      units: JSON.stringify(units)
    }
  })
  return response.data
}

export const getWeatherByLocationName = async (location, units) => {
  console.log(location, units)
  if (!location) return null;
  const response = await weatherApi.get(`/${location}`, {
    params: {
      units: JSON.stringify(units)
    }
  })
  return response.data
}

export default weatherApi;