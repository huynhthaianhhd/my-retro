import React, {useEffect, useState} from "react";
import { Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Avatar } from "antd";
function Header() {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
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
              className="avt"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <p>{user.name} |</p>
            <p onClick={()=>{localStorage.removeItem('user'); history.push('/')}}>Log out</p>
        </>
      }
           
        </Col>
      </Row>
  );
}

export default Header;
