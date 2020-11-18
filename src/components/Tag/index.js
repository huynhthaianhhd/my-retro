import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  EditOutlined,
  CloseCircleOutlined,
  StarFilled,
  PlusOutlined,
} from "@ant-design/icons";
function Tag(props) {
  const { typeName, item, showModalEdit, deleteTag, index } = props;
  return (
    <>
      <Draggable draggableId={item.id+""} index={index} key={index}>
        {(provided) => (
          <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
            className={`tag-item ${typeName}`}
          >
            <div>{item.tagname}</div>
            <div className="icons">
              <EditOutlined
                onClick={() => {
                  showModalEdit(item.id);
                }}
                className="edit-icon"
              />
              <CloseCircleOutlined
                onClick={() => {
                  deleteTag(item.id);
                }}
                className="delete-icon"
              />
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Tag;
