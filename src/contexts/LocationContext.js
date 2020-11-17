import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Context = React.createContext();

export const LocationStore = ({ children }) => {
  const [chatLocation, setChatLocation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/chat')) setChatLocation(true);

    return () => {
      setChatLocation(false);
    }
  }, [location])

  return (
    <Context.Provider
      value={[chatLocation, setChatLocation]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;