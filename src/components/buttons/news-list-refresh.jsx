import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import WithNewsService from '../hoc';
import { fetchNewsList } from '../../actions';

const NewsListRefreshButton = (props) => {
  const { fetchNewsList } = props;

  return (
    <Button className='rnl' onClick={() => fetchNewsList()}>
      Refresh News
    </Button>
  );
};

const mapDispatchToProps = (dispatch, { newsServiсe }) => {
  return {
    fetchNewsList: fetchNewsList(newsServiсe, dispatch),
  };
};

export default WithNewsService()(
  connect(null, mapDispatchToProps)(NewsListRefreshButton)
);
