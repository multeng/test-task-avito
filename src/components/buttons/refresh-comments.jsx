import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import WithNewsService from '../hoc';

const RefreshComments = (props) => {
  return (
    <Button onClick={() => console.log(props)}>
      Refresh Comments
    </Button>
  );
};

const mapDispatchToProps = (dispatch) => {};

export default WithNewsService()(
  connect(null, mapDispatchToProps)(RefreshComments)
);
