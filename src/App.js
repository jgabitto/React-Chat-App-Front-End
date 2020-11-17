import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';

import * as ROUTES from './constants/routes';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Chat from './components/Chat/Chat';
import JoinChat from './components/Chat/JoinChat';
import Landing from './components/Landing';
import Account from './components/Account';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import NavbarComponent from './components/Navbar';
import history from './history';
import { AuthStore } from './contexts/AuthContext';
import { LocationStore } from './contexts/LocationContext';
import { ChatStore } from './contexts/UserContext';
import GlobalStyle from './components/styles/globalStyles';


const App = () => {
  return (
    <Router history={history}>
      <CookiesProvider>
        <LocationStore>
          <AuthStore>
            <ChatStore>
              <GlobalStyle />
              <NavbarComponent />
              <Switch>
                <Route path={ROUTES.LANDING} exact component={Landing} />
                <PublicRoute path={ROUTES.SIGN_IN} exact component={Signin} />
                <PublicRoute path={ROUTES.SIGN_UP} exact component={Signup} />
                {/* <PrivateRoute path={ROUTES.HOME} exact component={Home} />
            <PrivateRoute path={ROUTES.ACCOUNT} exact component={Account} /> */}
                <PrivateRoute path={ROUTES.JOIN_CHAT} exact component={JoinChat} />
                <PrivateRoute path={ROUTES.CHAT} exact component={Chat} />
                <Route path="*" render={() => <Redirect to="/" />} />
              </Switch>
            </ChatStore>
          </AuthStore>
        </LocationStore>
      </CookiesProvider>
    </Router>
  )
}

export default App;