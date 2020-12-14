import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import WithNewsService from '../hoc';
import { fetchComments } from '../../actions';

const RefreshComments = (props) => {
  const { id, fetchCommentsData } = props;
  return (
    <Button onClick={() => fetchCommentsData(id)}>Refresh Comments</Button>
  );
};

const mapDispatchToProps = (dispatch, { newsServiсe }) => ({
  fetchCommentsData(id) {
    fetchComments(newsServiсe, id, dispatch);
  },
});

export default WithNewsService()(
  connect(null, mapDispatchToProps)(RefreshComments)
);
