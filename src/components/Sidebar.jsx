import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Basket, Flag, Home, List, Logo, Statistic, VectorBlack, Plus, Qua, home2Image, flag2Image, list2Image, basket2Image, statistic2Image } from "../images/index";

const Sidebar = ({ setActiveComponent }) => {
  const [activeItem, setActiveItem] = useState('home');
  const [activeTextColor, setActiveTextColor] = useState('#D5A426');

  const handleItemClick = (item) => {
    setActiveItem(item);
    setActiveTextColor('#D5A426');
    setActiveComponent(item);
  };

  return (
    <div className='sidebar'>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="menu">
        <div className={`part ${activeItem === 'home' ? 'active' : ''}`} onClick={() => handleItemClick('home')}>
          <img className='part__image' src={activeItem === 'home' ? home2Image : Home} alt="" />
          <p className='part__text' style={{ color: activeItem === 'home' ? activeTextColor : '' }}>Загальна</p>
        </div>
        <div className={`part ${activeItem === 'tracking' ? 'active' : ''}`} onClick={() => handleItemClick('tracking')}>
          <img className='part__image' src={activeItem === 'tracking' ? flag2Image : Flag} alt="" />
          <p className='part__text' style={{ color: activeItem === 'tracking' ? activeTextColor : '' }}>Відстеження</p>
        </div>
        <div className={`part ${activeItem === 'services' ? 'active' : ''}`} onClick={() => handleItemClick('services')}>
          <img className='part__image' src={activeItem === 'services' ? list2Image : List} alt="" />
          <p className='part__text' style={{ color: activeItem === 'services' ? activeTextColor : '' }}>Послуги</p>
          <img className='part__image' src={VectorBlack} alt="" />
        </div>
        <div className={`part ${activeItem === 'shop' ? 'active' : ''}`} onClick={() => handleItemClick('shop')}>
          <img className='part__image' src={activeItem === 'shop' ? basket2Image : Basket} alt="" />
          <p className='part__text' style={{ color: activeItem === 'shop' ? activeTextColor : '' }}>Магазинчик</p>
        </div>
        <div className={`part ${activeItem === 'statistics' ? 'active' : ''}`} onClick={() => handleItemClick('statistics')}>
          <img className='part__image' src={activeItem === 'statistics' ? statistic2Image : Statistic} alt="" />
          <p className='part__text' style={{ color: activeItem === 'statistics' ? activeTextColor : '' }}>Статистика</p>
        </div>
      </div>

      <hr />
      <div className="create">
        <p className="create__text">Створити Накладну</p>
        <div className="create__picture">
          <img src={Plus} alt="" />
        </div>
      </div>
      <hr />

      <div className="adv">
        <h5 className='adv-h5'>Тут могла бути ваша реклама, напишіть нам на пошту</h5>
        <p className='adv-p'>galaxyexpress7438@gmail.com</p>
        <img src='coin.png' className='coin-image' />
      </div>

      <div className="qua">
        <img className="qua__picture" src={Qua} alt="" />
        <p className="qua__text">Потрібна допомога?</p>
      </div>
    </div>
  );
}

export default Sidebar;
