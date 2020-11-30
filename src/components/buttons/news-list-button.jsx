import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import WithNewsService from '../hoc';
import { fetchNews } from '../../actions';


const NewsListButton = (props) => {
  const { fetchNews } = props;

  return <Button onClick={() => fetchNews()}>Refresh News</Button>;
};

const mapDispatchToProps = (dispacth, { newsServise }) => {
  return {
    fetchNews: fetchNews(newsServise, dispacth),
  };
};

export default WithNewsService()(
  connect(null, mapDispatchToProps)(NewsListButton)
);
