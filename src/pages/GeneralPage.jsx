import React, { useState } from "react";
import "./GeneralPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import Tracking from "./Tracking";
// import Services from "./Services";
// import Shop from "./Shop";
// import Statistics from "./Statistics";

const GeneralPage = ({ token }) => {
  const [activeComponent, setActiveComponent] = useState('home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home token={token} />;
      case 'tracking':
        return <Tracking token={token} />;
      // case 'services':
      //   return <Services token={token} />;
      // case 'shop':
      //   return <Shop token={token} />;
      // case 'statistics':
      //   return <Statistics token={token} />;
      default:
        return <Home token={token} />;
    }
  };

  return (
    <div className='container-general'>
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="main-content-general">
        <Header className="header-general" token={token} />
        <div className="page-content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default GeneralPage;
