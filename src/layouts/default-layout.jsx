import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { useParams } from 'react-router-dom';
import NewsListRefreshButton from '../components/buttons/news-list-refresh';
import RefreshComments from '../components/buttons/refresh-comments';

const { Header, Sider, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
  const { id } = useParams();
  return (
    <Layout className='default-layout'>
      <Header className='app-header' style={{ backgroundColor: '#fff' }}>
        <div className='app-header__logo'>
          <Link to='/'>Seller Experience</Link>
        </div>
      </Header>
      <Content>
        <Layout style={{ backgroundColor: '#fff' }}>
          <Sider width={400} theme={'light'}>
            {id ? (
              <div className='rnl'>
                <RefreshComments id={id} />
                <Button style={{ marginTop: 20 }}>
                  <Link to='/news'>Back to News</Link>
                </Button>
              </div>
            ) : (
              <NewsListRefreshButton />
            )}
          </Sider>
          <Content
            className='default-layout__content'
            style={!id ? { alignItems: 'center' } : null}
          >
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          position: 'fixed',
          bottom: '0',
          textAlign: 'center',
          height: '80px',
          width: '100%',
        }}
      >
        ©{new Date().getFullYear()} Created by multeng
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
