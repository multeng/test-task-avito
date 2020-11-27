import React from 'react';
import { useAsync } from 'react-use';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Space, BackTop } from 'antd';
import {
  StarOutlined,
  AppstoreAddOutlined,
  UpOutlined,
} from '@ant-design/icons';
import DefaultLayout from '../../layouts/default-layout';
import WithNewsService from '../hoc';
import { newsLoaded, newsRequested, newsError } from '../../actions';

const NewsList = (props) => {
  const {
    newsServise,
    newsList,
    newsLoaded,
    newsRequested,
    newsError,
    loading,
    error,
  } = props;

  const fetchData = async () => {
    newsRequested();
    const newsNumbers = await newsServise.getNews();
    const newsObjects = await Promise.all(
      newsNumbers.map(newsServise.getNewsById)
    );
    newsLoaded(newsObjects);
  };

  useAsync(async () => {
    try {
      fetchData();
    } catch (error) {
      newsError(error);
    }
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

const mapStateToProps = ({ newsList, loading, error }) => {
  return { newsList, loading, error };
};

const mapDispatchToProps = {
  newsLoaded,
  newsRequested,
  newsError,
};

export default WithNewsService()(
  connect(mapStateToProps, mapDispatchToProps)(NewsList)
);
