import axios from 'axios';

const locationApi = axios.create({
  baseUrl: 'http://localhost:8000/location',
})

export const getLocation = async (coords) => {
  console.log(coords);
  const response = await locationApi.get('/', {
    params: {
      coords: JSON.stringify(coords)
    }
  })
  return response.data
}

export default locationApi;