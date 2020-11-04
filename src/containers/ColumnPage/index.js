import React, { useState, useEffect } from "react";
import Content from "../../components/Content";
import ContentColumn from "../../components/ContentColumn";
import { Layout, Menu, Breadcrumb, message } from "antd";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./index.css";
const URL = "http://localhost:4000";
function ColumnPage({ match }) {
//   console.log(match.params.id);
  const [tagListWentWell, setTagListWentWell] = useState({});
  const [tagListImprove, setTagListImprove] = useState({});
  const [tagListActions, setTagListActions] = useState({});
  const [nameBoard, setNameBoard] = useState('')
  const [effect, setEffect] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
        await axios({
            method: "get",
            url: `${URL}/board/${match.params.id}`,
          }).then(function (response) {
            const data = response.data;
            setNameBoard(data.boardname);
          });
    await axios({
      method: "get",
      url: `${URL}/tag?boardId=${match.params.id}&type=1`,
    }).then(function (response) {
      const data = response.data;
      setTagListWentWell({
        list: data.tags,
        idColumn: data.id,
      });
    });
    await axios({
      method: "get",
      url: `${URL}/tag?boardId=${match.params.id}&type=2`,
    }).then(function (response) {
      const data = response.data;
      setTagListImprove({
        list: data.tags,
        idColumn: data.id,
      });
    });
    await axios({
      method: "get",
      url: `${URL}/tag?boardId=${match.params.id}&type=3`,
    }).then(function (response) {
      const data = response.data;
      setTagListActions({
        list: data.tags,
        idColumn: data.id,
      });
    });
    }
    fetchData();
  }, [effect]);
  const handleAddTag = (e) => {
    axios({
      method: "post",
      url: `${URL}/tag/create`,
      data: {
        tagname: e.tagname,
        columnId: e.id,
      },
    }).then(function (response) {
      setEffect(!effect);
    });
  };
  const handleEditTag = (e) => {
    axios({
      method: "post",
      url: `${URL}/tag/update`,
      data: {
        tagname: e.tagname,
        id: e.id,
      },
    }).then(function (response) {
      setEffect(!effect);
    });
  };
  const handleDeleteTag = (e) => {
    axios({
      method: "post",
      url: `${URL}/tag/delete`,
      data: {
        id: e,
      },
    }).then(function (response) {
        console.log(response.data);
      message.success('Delete Success!');
      setEffect(!effect);
    });
  };
  console.log('bbbbbbbb',tagListWentWell);
  return (
    <div className="column-page">
      <Header />
      <ContentColumn
        boardName = {nameBoard}
        tagListWentWell={tagListWentWell}
        tagListImprove={tagListImprove}
        tagListActions={tagListActions}
        handleAddTag={handleAddTag}
        handleEditTag={handleEditTag}
        handleDeleteTag={handleDeleteTag}
      />
    </div>
  );
}

export default ColumnPage;
