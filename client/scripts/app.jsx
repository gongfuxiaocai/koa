import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';

import { renderRoutes } from 'epm-ui-boot-dev';

import routes from './config/routes';

const App = ( { initialState, basename } ) => (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <hr />

      <Switch>
        { renderRoutes( routes, { initialState, autoLoadData: true } ) }
        <Redirect from='/redirect' to="/about" />
      </Switch>
    </div>
);

export default App;