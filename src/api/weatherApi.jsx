import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'http://localhost:8000',
})

export const getWeather = async ( coords ) => {
  console.log(coords)
  const response = await weatherApi.get('/weather', {
    params: {
      coords: JSON.stringify(coords)
    }
  })
  return response.data
}

export default weatherApi;