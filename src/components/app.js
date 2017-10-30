import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './header';
import Home from './home';
import LoginPage from './login-page';
import RegistrationPage from './user-registration-page';
import UserProfile from './profile';
import CurateContainer from './curate';

export default function App(props) {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegistrationPage} />
        <Route path="/curate" component={CurateContainer} />
        <Route path="/:username" component={UserProfile} />
      </Switch>
    </div>
  );
}
