import React, { useState, useRef } from "react";
import "./Tracking.css";

const Tracking = () => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="tracking-page">
      <h4 className="tracking-page-h4">Відстеження</h4>
      <div className="tracking-page-filter">
        <div className="frame-group1-tracking"  style={{ zIndex: 2 }}>
                  <div className="component-1-home">
                    <div className="header-group-tracking">
                      <input
                        className="search-drum-kits-home"
                        placeholder='Знайти за номером накладної'
                        type="text"
                      />
                      <button className="phmagnifying-glass-bold-wrapper" >
                        <p>Пошук</p>
                      </button>
                    </div>
                  </div>  
        </div>
        <div className="rectangle-parent2-tracking">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11">
          <b>Всі посилки</b>
            <b className="b9"> (9) </b>
          </div>
          <div ref={dropdownRef} className="dropdown-container-home" onClick={toggleDropdown}>
            {isOpen && (
              <div className="dropdown-list-tracking">
                <ul className='dropdown-list-ul-home'>
                  <li className="dropdown-list-li-home" >1</li>
                  <li className="dropdown-list-li-home" >2</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="text-frame" onClick={toggleDropdown}>
          <img
            className="group-frame-icon"
            alt=""
            src="/group-frame.svg"
          />
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
       
      </div>

      <div className="rectangle-parent2-tracking2">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11-calendar">
            <img src="calendar2.png" />
            <div className="b9-calendar-text">
              <b className="b9-calendar">Вибрати дату</b>
            </div>
          </div>
          <div className="dropdown-container-home" >
        
          </div>
        </div>
        <div className="text-frame" >
          <img
            className="group-frame-icon"
            alt=""
            src="/group-frame.svg"
          />
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
        />
       
      </div>
      <div className="box-settings">
        <p>Статус</p>
        <p style={{ marginLeft: "185px" }}>Номер</p>
        <p style={{ marginLeft: "105px" }}>Отримувач</p>
        <p style={{ marginLeft: "65px" }}>Адреса отримування</p>
        <p style={{ marginLeft: "35px" }}>Дата</p>
        <p style={{ marginLeft: "45px" }}>Ціна</p>
        <p style={{ marginLeft: "35px" }}>Остаточна ціна</p>
      </div>

        </div>
    </div>
  );
}

export default Tracking;
