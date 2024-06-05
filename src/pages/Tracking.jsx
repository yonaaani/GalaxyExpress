import React, { useState } from "react";
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
        <div className="rectangle-parent2-home">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11">
          <b>Всі посилки</b>
            <b className="b9">9</b>
          </div>
          <div ref={dropdownRef} className="dropdown-container-home" onClick={toggleDropdown}>
            {isOpen && (
              <div className="dropdown-list-home">
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

        </div>
    </div>
  );
}

export default Tracking;
