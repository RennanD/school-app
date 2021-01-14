import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from '../pages/Home';

// import { Container } from './styles';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
