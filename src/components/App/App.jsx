import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import NewsList from '../pages/news-list';
import NewsInfo from '../pages/news-info';

const App = () => {
  return (
    <Switch>
      <Route path='/news/:id' component={NewsInfo} />
      <Route path='/news' component={NewsList} />
      <Redirect from='/' to='/news' />
    </Switch>
  );
};

export default App;
