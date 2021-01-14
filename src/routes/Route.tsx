import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import DefaultLayout from '../layouts/Default';

interface AppRoutProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const AppRoute: React.FC<AppRoutProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
      {...rest}
    />
  );
};

export default AppRoute;
