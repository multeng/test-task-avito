import React from 'react';
import { NewsServiceConsumer } from '../news-service-context';

const WithNewsService = () => (Wrapped) => {
  return (props) => {
    return (
      <NewsServiceConsumer>
        {(newsServiсe) => {
          return <Wrapped {...props} newsServiсe={newsServiсe} />;
        }}
      </NewsServiceConsumer>
    );
  };
};

export default WithNewsService