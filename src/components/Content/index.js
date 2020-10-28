import React from "react";
import { Breadcrumb, Badge } from "antd";
import { Button, Tooltip, Row, Col, Card } from "antd";
import { PlusOutlined, FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import "antd/dist/antd.css";
import "./index.css";
function Content({ boardList }) {
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
      <div className="list-boards">
        <Row>
          <Col span={5} style={{ padding: "15px" }}>
            <div className="box-add">
              <Tooltip title="Add Board">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </div>
          </Col>
          {boardList.map((item) => {
            return (
              <Col span={5} key={item.id} style={{ padding: "15px" }}>
                <div className="board-user">
                  <Card title={item.boardname} bordered={true}>
                    <FieldTimeOutlined />{" "}
                    {moment(item.created).format("YYYY/MM/DD")}
                    <div>
                      <Badge
                        className="site-badge-count"
                        count={1}
                        style={{ backgroundColor: "#00FF00" }}
                      />
                      <Badge
                        className="site-badge-count"
                        count={1}
                        style={{ backgroundColor: "#FF0000" }}
                      />
                      <Badge
                        className="site-badge-count-4"
                        count={1}
                        style={{ backgroundColor: "#FF00FF" }}
                      />
                    </div>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Content;
