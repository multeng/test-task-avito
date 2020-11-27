import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';

import { newsLoaded } from '../../actions';

const NewsListButton = () => {
  return (<Button onClick={()=> newsLoaded()} ></Button>)
}

const mapDispatchToProps = {
  newsLoaded,
};

export default connect(null, mapDispatchToProps)(NewsListButton)