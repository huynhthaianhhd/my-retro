import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { Avatar } from "antd";
function Header() {
  return (
      <Row className="header">
        <Col span={20}>
          <div className="logo">
            <span>FunRetro</span>
          </div>
        </Col>
        <Col span={4} className='inf-avt'>
            <Avatar
              className="avt"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <p>Huynh Thai Anh</p>
        </Col>
      </Row>
  );
}

export default Header;
