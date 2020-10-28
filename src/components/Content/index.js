import React from "react";
import { Breadcrumb } from "antd";
import { Button, Tooltip, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./index.css";
function Content() {
  return (
    <div className="content">
      <div>
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <p className="text-myboard">My Board</p>
      </div>
      <div className='list-boards'>
        <Row>
        <Col span={5} style={{ padding: '15px' }}>
            <div className="box-add">
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
          <Col span={5} style={{ padding: '15px' }}>
            <div className="box-add">
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
          <Col span={5} style={{ padding: '15px' }}>
            <div className="box-add">
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
          <Col span={5} style={{ padding: '15px' }}>
            <div className="box-add">
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
          <Col span={5} style={{ padding: '15px' }}>
            <div className="box-add">
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
          <Col span={5} style={{ padding: '15px' }}>
            <div className="box-add">
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Content;
