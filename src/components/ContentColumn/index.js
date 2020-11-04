import React,{useState} from "react";
import { Button, Tooltip, Row, Col, Card } from "antd";
import "antd/dist/antd.css";
import {
  EditOutlined,
  CloseCircleOutlined,
  StarFilled,
  PlusOutlined,
} from "@ant-design/icons";
import "./index.css";
import ModalAddTag from "../ModalAddTag";
import ModalEditTag from "../ModalEditTag";
function ContentColumn({tagListWentWell, tagListImprove, tagListActions, handleAddTag, handleEditTag , handleDeleteTag, boardName}) {
  if (!tagListWentWell.list){
    tagListWentWell.list=[];
  }
  if (!tagListImprove.list){
    tagListImprove.list=[];
  }
  if (!tagListActions.list){
    tagListActions.list=[];
  }
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idColumn, setIdColumn] = useState(0);
  const [idTag, setIdTag] = useState(0);
  const showModal = (e) => {
    setIdColumn(e);
    setVisible(true);
  };
  const showModalEdit = (e) => {
    setIdTag(e);
    setVisibleEdit(true);
  };
  const handleOk = (e)=>{
    handleAddTag({tagname: e, id: idColumn});
    setVisible(false);
  }
  const handleOkEdit = (e)=>{
    handleEditTag({tagname: e, id:idTag});
    setVisibleEdit(false);
  }
  const deleteTag = (e)=>{
    handleDeleteTag(e);
  }
  const handleCancel = (e)=>{
    setVisible(false);
    setVisibleEdit(false);
  }
  return (
    <div>
      <ModalAddTag
            visible={visible}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
      <ModalEditTag
            oldName='abc'
            visible={visibleEdit}
            handleCancel={handleCancel}
            handleOk={handleOkEdit}
          />
      <div className="board-name-text">{boardName}</div>
      <Row>
        <Col span={8} style={{ padding: "15px" }}>
          <div className="column-item">
            <StarFilled
              className="icon-column"
              style={{ color: "forestgreen" }}
            />
            <div>WENT WELL</div>
          </div>
          <div className="add-btn">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {showModal(tagListWentWell.idColumn)}}
            />  
          </div>
          {tagListWentWell.list.map((item) => {
            return (
              <div key={item.id} className="tag-item type-went-well">
                <div>{item.tagname}</div>
                <div className="icons">
                  <EditOutlined onClick={() => {showModalEdit(item.id)}} className="edit-icon" />
                  <CloseCircleOutlined onClick={() => {deleteTag(item.id)}} className="delete-icon" />
                </div>
              </div>
            );
          })}
        </Col>
        <Col span={8} style={{ padding: "15px" }}>
          <div className="column-item">
            <StarFilled className="icon-column" style={{ color: "crimson" }} />
            <div>TO IMPROVE</div>
          </div>
          <div className="add-btn">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {showModal(tagListImprove.idColumn)}}
            />
          </div>
          {tagListImprove.list.map((item) => {
            return (
              <div key={item.id} className="tag-item type-improve">
                <div>{item.tagname}</div>
                <div className="icons">
                  <EditOutlined onClick={() => {showModalEdit(item.id)}} className="edit-icon" />
                  <CloseCircleOutlined onClick={() => {deleteTag(item.id)}} className="delete-icon" />
                </div>
              </div>
            );
          })}
        </Col>
        <Col span={8} style={{ padding: "15px" }}>
          <div className="column-item">
            <StarFilled
              className="icon-column"
              style={{ color: "darkorchid" }}
            />
            <div>ACTION ITEMS</div>
          </div>
          <div className="add-btn">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {showModal(tagListActions.idColumn)}}
            />
          </div>
          {tagListActions.list.map((item) => {
            return (
              <div key={item.id} className="tag-item type-action">
                <div>{item.tagname}</div>
                <div className="icons">
                  <EditOutlined onClick={() => {showModalEdit(item.id)}} className="edit-icon" />
                  <CloseCircleOutlined onClick={() => {deleteTag(item.id)}} className="delete-icon" />
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

export default ContentColumn;
