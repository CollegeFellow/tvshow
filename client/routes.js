import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage.js';

import DashboardWrapper from './components/dashboard/user/DashboardWrapper';
import HomeChild from './components/dashboard/user/HomeChild';
import ChangePasswordPage from './components/dashboard/user/ChangePasswordPage';
import TVShows from './components/dashboard/user/TVShows';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/login" component={LoginPage} />

    <Route path="/user/dashboard" component={requireAuth(DashboardWrapper)} >
        <IndexRoute component={HomeChild} />
        <Route path="change-password" component={ChangePasswordPage} />
        <Route path="tv-shows" component={TVShows} />
    </Route>

  </Route>
);
