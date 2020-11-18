import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
import "./index.css";
import "antd/dist/antd.css";
import axios from "axios";
import { message } from "antd";
import ModalSignUp from "../ModalSignUp";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const URL = "http://localhost:4000";
function FormLogin(props) {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    axios({
      method: "post",
      url: `${URL}/user/register`,
      data: {
        id: uuidv4(),
        email: e.email,
        password: e.password,
        name: e.nickname,
      },
    })
      .then(function (response) {
        message.success("Success");
        setVisible(false);
      })
      .catch(function (error) {
        message.error("Email have used");
      });
  };
  const responseFacebook = (rs) => {
    console.log(rs);
    axios({
      method: "get",
      url: `${URL}/user/${rs.id}`,
    })
      .then(function (response) {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          history.push({
            pathname: `/home`,
          });
        } else {
          axios({
            method: "post",
            url: `${URL}/user/register`,
            data: {
              id: rs.id,
              email: rs.email,
              password: rs.id,
              name: rs.name,
            },
          })
            .then(function (response) {
              localStorage.setItem("user", JSON.stringify(response.data));
              history.push({
                pathname: `/home`,
              });
            })
            .catch(function (error) {});
        }
      })
      .catch(function (error) {
        message.error("Email have used");
      });
  };
  const responseGoogle = (rs) => {
    if (rs.profileObj)
    {
      console.log(rs.profileObj.googleId,rs.profileObj.email,rs.profileObj.name)
      axios({
        method: "get",
        url: `${URL}/user/${rs.profileObj.googleId}`,
      })
        .then(function (response) {
          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            history.push({
              pathname: `/home`,
            });
          } else {
            axios({
              method: "post",
              url: `${URL}/user/register`,
              data: {
                id: rs.profileObj.googleId,
                email: rs.profileObj.email,
                password: rs.profileObj.googleId,
                name: rs.profileObj.name,
              },
            })
              .then(function (response) {
                localStorage.setItem("user", JSON.stringify(response.data));
                history.push({
                  pathname: `/home`,
                });
              })
              .catch(function (error) {});
          }
        })
        .catch(function (error) {
          message.error("Email have used");
        });
    }
    
  };
  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  const onFinish = (values) => {
    axios({
      method: "post",
      url: `${URL}/user/login`,
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push({
          pathname: `/home`,
        });
      })
      .catch(function (error) {
        message.error("Wrong email or password");
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
          <Button className="sign-up" onClick={showModal}>
            Sign up
          </Button>
          <FacebookLogin
            appId="674758123196421" 
            fields="name,email,picture"
            callback={responseFacebook}
          />
          <GoogleLogin
            className="gg-btn"
            clientId="188238712215-brqomu4k22s2np1i9itsk1iq5tihs3du.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Form.Item>
      </Form>
      <ModalSignUp
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default FormLogin;
