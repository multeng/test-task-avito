import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { Descriptions } from 'antd';
import { Spin } from 'antd';
import WithNewsService from '../hoc';

const NewsInfo = (props) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const { newsServise, data } = props;
  const { id } = useParams();

  useAsync(async () => {
    console.log(id);
  }, []);
  return (
    <Descriptions title={'fake'}>
      <Descriptions.Item label='UserName'>{'fake'}</Descriptions.Item>
      <Descriptions.Item label='Rating'>{'fake'}</Descriptions.Item>
      <Descriptions.Item label='Data'>{'fake'}</Descriptions.Item>
    </Descriptions>
  );
};

export default WithNewsService()(NewsInfo);
