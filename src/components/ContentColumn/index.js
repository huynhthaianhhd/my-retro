import React, { useState, useEffect } from "react";
import { Button, Tooltip, Row, Col, Card } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import "antd/dist/antd.css";
import {
  EditOutlined,
  CloseCircleOutlined,
  StarFilled,
  PlusOutlined,
} from "@ant-design/icons";
import socket from '../../socket';
import "./index.css";
import ModalAddTag from "../ModalAddTag";
import ModalEditTag from "../ModalEditTag";
import Column from "../Column";
import axios from "axios";

const URL = "http://localhost:4000";
function ContentColumn({
  tagListWentWell,
  tagListImprove,
  tagListActions,
  handleAddTag,
  handleEditTag,
  handleDeleteTag,
  boardName,
  setEffectPage
}) {
  if (!tagListWentWell.list) {
    tagListWentWell.list = [];
  }
  if (!tagListImprove.list) {
    tagListImprove.list = [];
  }
  if (!tagListActions.list) {
    tagListActions.list = [];
  }
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [idColumn, setIdColumn] = useState(0);
  const [idTag, setIdTag] = useState(0);
  const [categoriesState, setCategoriesState] = useState([
    {
      id: tagListWentWell.idColumn,
      tasks: tagListWentWell.list,
    },
    {
      id: tagListImprove.idColumn,
      tasks: tagListImprove.list,
    },
    {
      id: tagListActions.idColumn,
      tasks: tagListActions.list,
    },
  ]);
  useEffect(() => {
    console.log({ tagListWentWell });
    setCategoriesState([
      {
        id: tagListWentWell.idColumn,
        tasks: tagListWentWell.list,
      },
      {
        id: tagListImprove.idColumn,
        tasks: tagListImprove.list,
      },
      {
        id: tagListActions.idColumn,
        tasks: tagListActions.list,
      },
    ]);
  }, [tagListWentWell, tagListImprove, tagListActions]);
  const showModal = (e) => {
    setIdColumn(e);
    setVisible(true);
  };
  const showModalEdit = (e) => {
    setIdTag(e);
    setVisibleEdit(true);
  };
  const handleOk = (e) => {
    handleAddTag({ tagname: e, id: idColumn });
    setVisible(false);
  };
  const handleOkEdit = (e) => {
    handleEditTag({ tagname: e, id: idTag });
    setVisibleEdit(false);
  };
  const deleteTag = (e) => {
    handleDeleteTag(e);
  };
  const handleCancel = (e) => {
    setVisible(false);
    setVisibleEdit(false);
  };
  function sortTasks(a, b) {
    if (a.order < b.order) {
      return -1;
    }

    if (a.order > b.order) {
      return 1;
    }

    return 0;
  }
  const reOrderArray = (array) =>
    array.map((item, index) => {
      const newItem = Object.assign({}, item, { order: index });

      return newItem;
    });
  const sortTasksWhenDrag = (
    tasksDestination,
    newIndex,
    result,
    dropedCategoryId,
    currentCategoryId
  ) => {
    let newCategoriesData = [...categoriesState];

    if (dropedCategoryId == currentCategoryId) {
      // when drag drop in same category
      let newTasks = tasksDestination.filter(
        (item) => item.id != result.draggableId
      );
      const task = tasksDestination.find(
        (item) => item.id == result.draggableId
      );
      newTasks.splice(newIndex, 0, task);
      newTasks = reOrderArray(newTasks);

      newCategoriesData = categoriesState.map((item) => {
        if (item.id == dropedCategoryId) {
          const newItem = Object.assign({}, item, {
            tasks: newTasks.sort(sortTasks),
          });

          return newItem;
        }

        return item;
      });
    } else {
      // when drag drop in diff category
      const currentCategory = categoriesState.find(
        (item) => item.id == currentCategoryId
      );
      const task = currentCategory.tasks.find(
        (item) => item.id == result.draggableId
      );
      tasksDestination.splice(newIndex, 0, task);

      const newTasksDestination = reOrderArray(tasksDestination);

      newCategoriesData = categoriesState.map((item) => {
        if (item.id == dropedCategoryId) {
          const newItem = Object.assign({}, item, {
            tasks: newTasksDestination.sort(sortTasks),
          });

          return newItem;
        }

        if (item.id == currentCategoryId) {
          let newTasks = item.tasks.filter(
            (value) => value.id != result.draggableId
          );
          newTasks = reOrderArray(newTasks);

          const newItem = Object.assign({}, item, {
            tasks: newTasks.sort(sortTasks),
          });

          return newItem;
        }

        return item;
      });
    }

    setCategoriesState(newCategoriesData);

    return newCategoriesData;
  };
  const onDragEnd = (result) => {
    const { source, destination, reason } = result;

    if (reason === "DROP" && destination && source) {
      const currentCategoryId = source.droppableId;
      const dropedCategoryId = destination.droppableId;
      const categoryDestination = categoriesState.find(
        (item) => item.id == dropedCategoryId
      );
      let tasksDestination = categoryDestination.tasks;
      const newIndex = destination.index;
      const taskId = result.draggableId;
      const newCategoriesData = sortTasksWhenDrag(
        tasksDestination,
        newIndex,
        result,
        dropedCategoryId,
        currentCategoryId
      );
      const data = {
        currentCategoryId,
        dropedCategoryId,
        taskId,
        newIndex,
        newCategoriesData,
      };
      console.log("tajtajt", data);
      axios({
        method: "post",
        url: `${URL}/tag/create-list`,
        data: data.newCategoriesData,
      }).then(function (response) {
        socket.emit('msgToServer', 'OKKKKKKKKK');
        setEffectPage();
      });
    }
  };
  console.log({ categoriesState });
  return (
    <div>
      <ModalAddTag
        visible={visible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <ModalEditTag
        oldName="abc"
        visible={visibleEdit}
        handleCancel={handleCancel}
        handleOk={handleOkEdit}
      />
      <div className="board-name-text">{boardName}</div>
      <DragDropContext onDragEnd={onDragEnd}>
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
                onClick={() => {
                  showModal(tagListWentWell.idColumn);
                }}
              />
            </div>
            <Column
              listTasks={categoriesState[0].tasks}
              showModalEdit={showModalEdit}
              deleteTag={deleteTag}
              type={"went-well"}
              idColumn={tagListWentWell.idColumn}
            />
          </Col>
          <Col span={8} style={{ padding: "15px" }}>
            <div className="column-item">
              <StarFilled
                className="icon-column"
                style={{ color: "crimson" }}
              />
              <div>TO IMPROVE</div>
            </div>
            <div className="add-btn">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => {
                  showModal(tagListImprove.idColumn);
                }}
              />
            </div>
            <Column
              listTasks={categoriesState[1].tasks}
              showModalEdit={showModalEdit}
              deleteTag={deleteTag}
              type={"improve"}
              idColumn={tagListImprove.idColumn}
            />
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
                onClick={() => {
                  showModal(tagListActions.idColumn);
                }}
              />
            </div>
            <Column
              listTasks={categoriesState[2].tasks}
              showModalEdit={showModalEdit}
              deleteTag={deleteTag}
              type={"action"}
              idColumn={tagListActions.idColumn}
            />
          </Col>
        </Row>
      </DragDropContext>
    </div>
  );
}

export default ContentColumn;
