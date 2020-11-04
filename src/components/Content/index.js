import React, { useState } from "react";
import { Breadcrumb, Badge } from "antd";
import { Button, Tooltip, Row, Col, Card } from "antd";
import {  notification } from 'antd';
import {
  PlusOutlined,
  FieldTimeOutlined,
  EditOutlined,
  CloseCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";
import ModalAddBoard from "../ModalAdd";
import ModalEditBoard from "../ModalEdit";
function Content({
  boardList,
  handleAddBoard,
  handleEditBoard,
  handleDeleteBoard,
}) {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [itemCurrent, setItemCurrent] = useState({});
  const showModal = () => {
    setVisible(true);
  };
  const showModalEdit = (e) => {
    console.log("name", e);
    setVisibleEdit(true);
    setItemCurrent(e);
  };

  const handleOk = (e) => {
    handleAddBoard(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
    setVisibleEdit(false);
  };
  const handleOkEdit = (e) => {
    handleEditBoard(e, itemCurrent.id);
    setVisibleEdit(false);
  };
  const deleteBoard = (e) => {
    handleDeleteBoard(e.id);
  };
  return (
    <div className="content">
      <div>
        <p className="text-myboard">My Board</p>
      </div>
      <div className="list-boards">
        <Row>
          <Col span={5} style={{ padding: "15px" }}>
            <div className="box-add">
              <Tooltip title="Add Board">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                />
              </Tooltip>
            </div>
          </Col>
          <ModalAddBoard
            visible={visible}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
          <ModalEditBoard
            oldName={itemCurrent.boardname}
            visible={visibleEdit}
            handleCancel={handleCancel}
            handleOkEdit={handleOkEdit}
          />
          {boardList.map((item) => {
            return (
              <Col span={5} key={item.id} style={{ padding: "15px" }}>
                <div
                  className="board-user"
                >
                  <Card title={item.boardname} bordered={true} onClick={() =>
                    history.push({
                      pathname: `/board/${item.id}`,
                    })
                  }>
                    <FieldTimeOutlined />{" "}
                    {moment(item.created).format("YYYY/MM/DD")}
                  </Card>
                  <div className="icons-board">
                    <EditOutlined
                      onClick={() => {
                        showModalEdit(item);
                      }}
                      className="edit-icon-board"
                    />
                    <CloseCircleOutlined
                      onClick={() => {
                        deleteBoard(item);
                      }}
                      className="delete-icon-board"
                    />
                    <CopyOutlined 
                      onClick={() => {
                        notification.open({
                          message: 'URL Share',
                          description:
                            `http://localhost:3000/board/${item.id}`,
                        });
                      }}
                    />
                  </div>
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
