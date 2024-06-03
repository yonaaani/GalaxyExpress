import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Basket, Flag, Home, List, Logo, Statistic, VectorBlack, Plus, Qua, home2Image, flag2Image, list2Image, basket2Image, statistic2Image } from "../images/index";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeTextColor, setActiveTextColor] = useState('');

    const handleItemClick = (image, color) => {
        setActiveItem(image);
        setActiveTextColor(color);
    };

    useEffect(() => {
        setActiveItem('home');
        setActiveTextColor('#D5A426');
    }, []);

    return (
        <div className='sidebar'>
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <div className="menu">
                <div className={`part ${activeItem === 'home' ? 'active' : ''}`} onClick={() => handleItemClick('home', '#D5A426')}>
                    <img className='part__image' src={activeItem === 'home' ? home2Image : Home} alt="" />
                    <p className='part__text' style={{color: activeItem === 'home' ? activeTextColor : ''}}>Загальна</p>
                </div>
                <div className={`part ${activeItem === 'flag' ? 'active' : ''}`} onClick={() => handleItemClick('flag', '#D5A426')}>
                    <img className='part__image' src={activeItem === 'flag' ? flag2Image : Flag} alt="" />
                    <p className='part__text' style={{color: activeItem === 'flag' ? activeTextColor : ''}}>Відстеження</p>
                </div>
                <div className={`part ${activeItem === 'list' ? 'active' : ''}`} onClick={() => handleItemClick('list', '#D5A426')}>
                    <img className='part__image' src={activeItem === 'list' ? list2Image : List} alt="" />
                    <p className='part__text' style={{color: activeItem === 'list' ? activeTextColor : ''}}>Послуги</p>
                    <img className='part__image' src={VectorBlack} alt="" />
                </div>
                <div className={`part ${activeItem === 'basket' ? 'active' : ''}`} onClick={() => handleItemClick('basket', '#D5A426')}>
                    <img className='part__image' src={activeItem === 'basket' ? basket2Image : Basket} alt="" />
                    <p className='part__text' style={{color: activeItem === 'basket' ? activeTextColor : ''}}>Магазинчик</p>
                </div>
                <div className={`part ${activeItem === 'statistic' ? 'active' : ''}`} onClick={() => handleItemClick('statistic', '#D5A426')}>
                    <img className='part__image' src={activeItem === 'statistic' ? statistic2Image : Statistic} alt="" />
                    <p className='part__text' style={{color: activeItem === 'statistic' ? activeTextColor : ''}}>Статистика</p>
                </div>
            </div>

            <hr/>
            <div className="create">
                <p className="create__text">Створити Накладну</p>
                <div className="create__picture">
                    <img src={Plus} alt="" />
                </div>
            </div>
            <hr/>

            <div className="adv"></div>

            <div className="qua">
                <img className="qua__picture" src={Qua} alt="" />
                <p className="qua__text">Потрібна допомога?</p>
            </div>
        </div>
    )
}

export default Sidebar;
