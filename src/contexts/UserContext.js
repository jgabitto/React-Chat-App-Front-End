import React, { useState, useEffect } from 'react';

const Context = React.createContext();

export const ChatStore = ({ children }) => {
  const [chatUser, setChatUser] = useState(null);

  console.log(chatUser)

  // useEffect(() => {
  //   if (location.pathname.includes('/chat')) setChatLocation(true);

  //   return () => {
  //     setChatLocation(false);
  //   }
  // }, [location])

  return (
    <Context.Provider
      value={[chatUser, setChatUser]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;