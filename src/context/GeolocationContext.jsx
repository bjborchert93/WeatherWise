import { createContext, useContext, useEffect, useState } from 'react';

const GeolocationContext = createContext({});

export const GeolocationProvider = ({ children }) => {
  const [ coords, setCoords ] = useState(() => {
    const storedCoords = localStorage.getItem('coords');
    return storedCoords ? JSON.parse(storedCoords) : null;
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoords(newCoords);
          localStorage.setItem('coords', JSON.stringify(newCoords));
        },
        (err) => {
          console.error(err);
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [])

  return (
    <GeolocationContext.Provider value={{ coords }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => {
  const { coords } = useContext(GeolocationContext);
  return coords;
};