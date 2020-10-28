import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./index.css";
import 'antd/dist/antd.css';
import Header from '../../components/Header'
import Content from "../../components/Content";

function HomePage() {
  return (
    <div className='home'>
        <Header/>
        <Content/>
    </div>
  );
}

export default HomePage;
