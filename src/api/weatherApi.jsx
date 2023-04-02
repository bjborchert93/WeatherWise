import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'http://localhost:8000/weather',
})

export const getWeatherByCoords = async (coords, units) => {
  console.log(coords, units)
  const response = await weatherApi.get('/', {
    params: {
      coords: JSON.stringify(coords),
      units: JSON.stringify(units)
    }
  })
  return response.data
}

export default weatherApi;