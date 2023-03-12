import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'http://localhost:8000/weather',
})

export const getWeather = async ( coords, units ) => {
  console.log(coords)
  const response = await weatherApi.get('/current', {
    params: {
      coords: JSON.stringify(coords),
      units: JSON.stringify(units)
    }
  })
  return response.data
}

export default weatherApi;