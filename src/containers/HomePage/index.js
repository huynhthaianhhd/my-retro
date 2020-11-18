import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, message } from "antd";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.css";
import Header from "../../components/Header";
import Content from "../../components/Content";
import axios from "axios";
const URL = "http://localhost:4000";

function HomePage(props) {
  let history = useHistory();
  const [boardList, setBoardList] = useState([]);
  const [user, setUser] = useState({});
  const [effect, setEffect] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `${URL}/board/user/${user.id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then(function (response) {
        const data = response.data;
        console.log({data});
        if (data.boards)
        {
          setBoardList(response.data.boards);
          setUser(user);
        }
        else{
          setBoardList([]);
          setUser(user);
        }
      });
    };
    if (user) {
      fetchData();
    } else {
      history.push("/");
    }
    return () => {};
  }, [effect]);
  const handleAddBoard = (e) => {
    console.log("Adddddddd board", e);
    axios({
      method: "post",
      url: `${URL}/board/create`,
      data: {
        id: uuidv4(),
        boardname: e,
        userId: user.id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(function (response) {
      console.log("data", response.data);
      setEffect(!effect);
    });
  };
  const handleEditBoard = (e,id) => {
    console.log("OKKK", e);
    axios({
      method: "post",
      url: `${URL}/board/update`,
      data: {
        boardname: e,
        id: id,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(function (response) {
      console.log("data", response.data);
      setEffect(!effect);
    });
  };
  const handleDeleteBoard = (e) => {
    console.log("OKKK", e);
    axios({
      method: "post",
      url: `${URL}/board/delete`,
      data: {
        id: e,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(function (response) {
      message.success('Delete Success!');
      setEffect(!effect);
    });
  };
  return (
    <div className="home">
      <Header />
      <Content
        handleAddBoard={handleAddBoard}
        handleEditBoard={handleEditBoard}
        handleDeleteBoard={handleDeleteBoard}
        boardList={boardList}
      />
    </div>
  );
}

export default HomePage;
