import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import ListSeries from '../pages/Series/List';

// import { Container } from './styles';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/series/list" component={ListSeries} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
