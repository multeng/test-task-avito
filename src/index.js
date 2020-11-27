import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import ErrorBoundry from './components/error-boundry';
import NewsApiServices from './services/news-api-services';
import { NewsServiceProvider } from './components/news-service-context';
import store from './store';

const newsApiService = new NewsApiServices();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <NewsServiceProvider value={newsApiService}>
        <Router>
          <App />
        </Router>
      </NewsServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
