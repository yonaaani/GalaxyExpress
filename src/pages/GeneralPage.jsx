import React, { useState } from "react";
import "./GeneralPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import Tracking from "./Tracking";
// import Services from "./Services";
// import Shop from "./Shop";
// import Statistics from "./Statistics";

const GeneralPage = ({ }) => {
  const [activeComponent, setActiveComponent] = useState('home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'tracking':
        return <Tracking />;
      // case 'services':
      //   return <Services token={token} />;
      // case 'shop':
      //   return <Shop token={token} />;
      // case 'statistics':
      //   return <Statistics token={token} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className='container-general'>
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="main-content-general">
        <Header className="header-general" />
        <div className="page-content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default GeneralPage;
