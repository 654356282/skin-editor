import React from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

const Login = () => {
  const history = useHistory();

  function handleSubmit() {
    history.replace('/editor');
  }

  return (
    <Layout>
      <Content>
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
