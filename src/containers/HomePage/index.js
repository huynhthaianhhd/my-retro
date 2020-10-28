import React, {useState, useEffect} from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./index.css";
import 'antd/dist/antd.css';
import Header from '../../components/Header'
import Content from "../../components/Content";
import axios from 'axios'

function HomePage() {
  const URL = process.env.URL;
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: URL,
    })
      .then(function (response) {
        setBoardList(response.data);
      });
  }, []);
  return (
    <div className='home'>
        <Header/>
        <Content boardList={boardList}/>
    </div>
  );
}

export default HomePage;
