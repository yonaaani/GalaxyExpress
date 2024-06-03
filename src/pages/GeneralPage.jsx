import React from "react";
import "./GeneralPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const GeneralPage = ({ token }) => {
  return (
    <div className='container-general'>
      <Sidebar className="sidebar" />
      <div className="main-content-general">
      <Header className="header-general" token={token} />
        <div className="page-content">

        </div>
      </div>
    </div>
  );
}

export default GeneralPage;
