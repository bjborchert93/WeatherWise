import { createContext, useContext, useState, useCallback } from "react";

const UnitsContext = createContext({});

const IMPERIAL = {
  type: 'imperial',
  degrees: '°F',
  wind: 'mph',
  volume: 'in/h'
}

const METRIC = {
  type: 'metric',
  degrees: '°C',
  wind: 'm/s',
  volume: 'mm/h'
}

export const UnitsProvider = ({ children }) => {
  const [units, setUnits] = useState(() => {
    const storedUnits = localStorage.getItem('units')
    return storedUnits ? JSON.parse(storedUnits) : IMPERIAL;
  });

  const toggleUnits = useCallback(() => {
    setUnits((prevUnits) => prevUnits.type === 'imperial' ? METRIC : IMPERIAL );
    localStorage.setItem('units', JSON.stringify(units.type === 'imperial' ? METRIC : IMPERIAL));
  }, [units.type]);

  return (
    <UnitsContext.Provider value={{ units, toggleUnits }}>
      { children }
    </UnitsContext.Provider>
  )
};

export const useUnits = () => {
  const { units, toggleUnits } = useContext(UnitsContext);
  return { units, toggleUnits };
}