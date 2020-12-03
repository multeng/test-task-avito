import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Space, BackTop, Result } from 'antd';
import PropTypes from 'prop-types';
import {
  StarOutlined,
  AppstoreAddOutlined,
  UpOutlined,
} from '@ant-design/icons';
import DefaultLayout from '../../layouts/default-layout';
import WithNewsService from '../hoc';
import { fetchNewsList } from '../../actions';

const NewsList = ({ newsList, loading, error, fetchNewsList }) => {
  useEffect(() => {
    fetchNewsList();
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
        <>
          <List
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
                ]}
              >
                <List.Item.Meta
                  title={<Link to={`/news/${item.id}`}>{item.title}</Link>}
                  description={item.by}
                />
              </List.Item>
            )}
          />
          <BackTop>
            <UpOutlined className='back-to-top' />
          </BackTop>
        </>
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
