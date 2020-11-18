import React, {useEffect, useState} from "react";
import { Row, Col, message } from "antd";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Avatar } from "antd";
import axios from "axios";
import ModalEditProfile from "../ModalEditProfile";
const URL = "http://localhost:4000";
function Header() {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const [effect, setEffect] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOk = (e) => {
    if (!e.password && !e.newPassword){
      axios({
        method: "post",
        url: `${URL}/user/update`,
        data: {
          name: e.nameUser,
          email: e.email,
        },
      }).then(function (response) {
        if (response.data) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          message.success('Success!');
          setEffect(!effect);
          setVisible(false);
        }
      });
    }
    else{
      axios({
        method: "post",
        url: `${URL}/user/update-pass`,
        data: {
          name: e.nameUser,
          email: e.email,
          password:e.password,
          newPassword:e.newPassword,
        },
      }).then(function (response) {
        if (response.data) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          message.success('Success!');
          setEffect(!effect);
          setVisible(false);
        }
        else{
          message.error('Wrong old password!');
        }
      });
    }
    console.log('aaaaaaaaa',e);
    
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  return (
      <Row className="header">
        <Col span={20}>
          <div className="logo">
            <span>FunRetro</span>
          </div>
        </Col>
        <Col span={4} className='inf-avt'>
        {user &&
        <>
           <Avatar
              onClick={showModal}
              className="avt"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <p onClick={showModal}>{user.name} |</p>
            <p onClick={()=>{localStorage.removeItem('user'); history.push('/')}}>Log out</p>
            <ModalEditProfile
            email={user.email || ''}
            name={user.name || ''}
            visible={visible}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
        </>
      }
            
        </Col>
      </Row>
  );
}

export default Header;
