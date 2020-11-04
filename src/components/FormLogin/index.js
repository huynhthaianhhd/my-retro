import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.css";
import axios from 'axios';
import { message } from 'antd';
import ModalSignUp from "../ModalSignUp";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const URL = 'http://localhost:4000';
function FormLogin(props) {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    axios({
        method: 'post',
        url: `${URL}/user/register`,
        data: {
            email : e.email,
            password: e.password,
            name: e.nickname
        },
      })
        .then(function (response) {
            message.success('Success');
            setVisible(false);
        }).catch(function (error) {
            message.error('Email have used');
        });
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  const onFinish = (values) => {
    axios({
        method: 'post',
        url: `${URL}/user/login`,
        data: {
            email : values.email,
            password: values.password,
        },
      })
        .then(function (response) {
          console.log(response.data);
          history.push({
            pathname: `/home`
          });
          localStorage.setItem('user', JSON.stringify(response.data));
        }).catch(function (error) {
            message.error('Wrong email or password');
        });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
          <Button className="sign-up" onClick={showModal}>Sign up</Button>
        </Form.Item>
      </Form>
      <ModalSignUp visible={visible} handleCancel={handleCancel} handleOk={handleOk} />
    </div>
  );
}

export default FormLogin;
