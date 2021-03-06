import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import ListSeries from '../pages/Series/List';
import ListClasses from '../pages/Classes/List';
import ListSubjects from '../pages/Subjects/List';

// import { Container } from './styles';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/series/list" component={ListSeries} />
        <Route path="/classes/list" component={ListClasses} />
        <Route path="/subjects/list" component={ListSubjects} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
