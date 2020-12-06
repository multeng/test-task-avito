import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Descriptions, Result, Spin } from 'antd';
import { fetchNews } from '../../actions';
import DefaultLayout from '../../layouts/default-layout';
import WithNewsService from '../hoc';
import Comments from './comments';

const NewsInfo = ({ news, loading, error, fetchData }) => {
  const { id } = useParams();
  useEffect(() => {
    fetchData(id);
  }, []);
  const { by, title, time, url, kids, score } = news;
  return (
    <DefaultLayout>
      {loading ? (
        <Spin size='large' />
      ) : error ? (
        <Result
          status='warning'
          title='There are some problems with your operation.'
        />
      ) : (
        <Descriptions title={title}>
          <Descriptions.Item label='Author'>{by}</Descriptions.Item>
          <Descriptions.Item label='Rating'>{score}</Descriptions.Item>
          <Descriptions.Item label='Data'>
            {new Date(time * 1000).toString().slice(0, 24)}
          </Descriptions.Item>
          <Descriptions.Item label='Site'>
            {
              <a href={url} rel='noopener noreferrer' target='_blank'>
                {url}
              </a>
            }
          </Descriptions.Item>
          {kids ? (
            <Descriptions.Item label='Comments'>
              {kids.length}
            </Descriptions.Item>
          ) : null}
        </Descriptions>
      )}
      <Comments commentsId={kids} />
    </DefaultLayout>
  );
};

const mapStateToProps = ({ newsInfoReducer: { news, loading, error } }) => {
  return { news, loading, error };
};

const mapDispatchToProps = (dispatch, { newsServiсe }) => ({
  fetchData(id) {
    fetchNews(newsServiсe, id, dispatch);
  },
});

export default WithNewsService()(
  connect(mapStateToProps, mapDispatchToProps)(NewsInfo)
);
