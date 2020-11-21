import React from 'react';
import { NewsServiceConsumer } from '../news-service-context';

const WithNewsService = () => (Wrapped) => {
  return (props) => {
    return (
      <NewsServiceConsumer>
        {(newsServise) => {
          return <Wrapped {...props} newsServise={newsServise} />;
        }}
      </NewsServiceConsumer>
    );
  };
};

export default WithNewsService