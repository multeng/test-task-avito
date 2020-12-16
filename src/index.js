import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Alert } from 'antd';
import App from './components/App';
import NewsApiServices from './services/news-api-services';
import { NewsServiceProvider } from './components/news-service-context';
import store from './store';

const newsApiService = new NewsApiServices();
const { ErrorBoundary } = Alert;

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <NewsServiceProvider value={newsApiService}>
        <Router>
          <App />
        </Router>
      </NewsServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
