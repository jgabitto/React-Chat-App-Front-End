import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import _ from 'lodash';

const Context = React.createContext();

// export const AuthStore = ({ children }) => {
//   const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
//   let token = null;

//   if (!_.isEmpty(cookies)) {
//     token = cookies['auth_token']
//   }

//   const [authUser, setAuthUser] = useState(token);
//   console.log(authUser)
//   return (
//     <Context.Provider
//       value={[authUser, setAuthUser]}
//     >
//       {children}
//     </Context.Provider>
//   )
// }

export const AuthStore = ({ children }) => {
  const [cookies, setCookie] = useCookies(['auth_token']);
  const [authUser, setAuthUser] = useState(cookies['auth_token']);

  // useEffect(() => {
  //   if (authUser && _.isEmpty(cookies)) {
  //     setCookie('auth_token', authUser)
  //   }
  // }, [authUser])

  return (
    <Context.Provider
      value={[authUser, setAuthUser]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;