import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Space, Result } from 'antd';
import PropTypes from 'prop-types';
import {
  StarOutlined,
  AppstoreAddOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import DefaultLayout from '../../layouts/default-layout';
import WithNewsService from '../hoc';
import { fetchNewsList } from '../../actions';

const NewsList = ({ newsList, loading, error, interval, fetchNewsList }) => {
  useEffect(() => {
    fetchNewsList();
    const interval = setInterval(() => {
      fetchNewsList();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <DefaultLayout>
      {error ? (
        <Result
          status='warning'
          title='There are some problems with your operation.'
        />
      ) : (
        <List
          style={{ width: '600px' }}
          pagination={{
            pageSize: 6,
          }}
          loading={loading}
          itemLayout='vertical'
          bordered={true}
          dataSource={newsList}
          size={'small'}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text={item.score}
                  key='list-vertical-star-o'
                />,
                <IconText
                  icon={AppstoreAddOutlined}
                  text={new Date(item.time * 1000).toString().slice(0, 24)}
                  key='list-vertical-message'
                />,
                item.kids ? (
                  <IconText
                    icon={CommentOutlined}
                    text={item.kids.length}
                    key='list-vertical-message'
                  />
                ) : null,
              ]}
            >
              <List.Item.Meta
                title={<Link to={`/news/${item.id}`}>{item.title}</Link>}
                description={item.by}
              />
            </List.Item>
          )}
        />
      )}
    </DefaultLayout>
  );
};

NewsList.propTypes = {
  newsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchNewsList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ newsListReducer: { newsList, loading, error } }) => {
  return { newsList, loading, error };
};

const mapDispatchToProps = (dispatch, { newsServiсe }) => {
  return {
    fetchNewsList: fetchNewsList(newsServiсe, dispatch),
  };
};

export default WithNewsService()(
  connect(mapStateToProps, mapDispatchToProps)(NewsList)
);
