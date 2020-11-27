import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

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
          <Sider style={{ width: '200px' }} theme={'light'}></Sider>
          <Content className='default-layout__content'>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', height: '100px' }}>
        ©2020 Created by multeng
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;