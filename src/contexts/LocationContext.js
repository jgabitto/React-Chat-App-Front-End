import React, { useState, useEffect } from 'react';

const Context = React.createContext();

export const LocationStore = ({ children }) => {
  const [chatLocation, setChatLocation] = useState(null);

  return (
    <Context.Provider
      value={[chatLocation, setChatLocation]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;