import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Descriptions, Result, Spin, PageHeader } from 'antd';
import { fetchNews, fetchComments } from '../../actions';
import DefaultLayout from '../../layouts/default-layout';
import WithNewsService from '../hoc';
import CommentsList from './comments';

const NewsInfo = ({
  news,
  loading,
  error,
  commentsLoading,
  comments,
  commentsError,
  fetchNewsData,
  fetchCommentsData,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchNewsData(id);
    fetchCommentsData(id);
    const interval = setInterval(() => {
      fetchCommentsData(id);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const { by, title, time, url, kids, score } = news;
  return (
    <DefaultLayout>
      {loading ? (
        <Spin size='large' />
      ) : error || commentsError ? (
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
      {kids && kids.length > 0 ? (
        <>
          <PageHeader
            title='Comments'
            style={{ display: 'flex', justifyContent: 'center' }}
          />
          {commentsLoading ? (
            <Spin size='large' />
          ) : (
            <CommentsList comments={comments} />
          )}
        </>
      ) : null}
    </DefaultLayout>
  );
};

const mapStateToProps = ({
  newsInfoReducer: {
    news,
    loading,
    error,
    comments,
    commentsLoading,
    commentsError,
  },
}) => {
  return { news, loading, error, comments, commentsLoading, commentsError };
};

const mapDispatchToProps = (dispatch, { newsServiсe }) => ({
  fetchNewsData(id) {
    fetchNews(newsServiсe, id, dispatch);
  },
  fetchCommentsData(id) {
    fetchComments(newsServiсe, id, dispatch);
  },
});

export default WithNewsService()(
  connect(mapStateToProps, mapDispatchToProps)(NewsInfo)
);
