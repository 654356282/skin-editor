import React from 'react';
import RootContainer from '@/containers';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Editor from '@/pages/Editor';
import Login from '@/pages/Login';

interface AppProps {}

export const App = (props: AppProps) => {
  return (
    <RootContainer.Provider>
      <Router>
        <Switch>
          <Route path={'/editor'} component={Editor} exact />
          <Route path={'/login'} component={Login} exact />
          <Redirect to={'/editor'} />
        </Switch>
      </Router>
    </RootContainer.Provider>
  );
};
