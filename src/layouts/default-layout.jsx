import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import NewsListButton from '../components/buttons/news-list-button';

const { Header, Sider, Content, Footer } = Layout;

const DefaultLayout = ({ children }) => {
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
            <NewsListButton />
          </Sider>
          <Content className='default-layout__content'>{children}</Content>
        </Layout>
      </Content>
      <Footer
        style={{
          position: 'fixed',
          bottom: '0',
          textAlign: 'center',
          height: '100px',
          width: '100%',
        }}
      >
        ©2020 Created by multeng
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
