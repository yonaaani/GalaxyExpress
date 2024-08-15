import React, { useState, useRef } from "react";
import "./Services.css";

const Services = ({ }) => {
    const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="services-page">
        <div className="services-page-colum1">
        <h4 className='edit-page-information-h4'>Розрахунок</h4>
        <p className="edit-page-information-p">Розрахуйте вартість доставки на основі вартості замовлення або загальної ваги посилки</p>
        <div className="group-editAccount">
        <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">з</b>
                    </div>
                    <input
                      className="location-reg"
                      placeholder="Київ, 01001, Україна"
                    />
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">в</b>
                    </div>
                    <input
                      className="location-reg"
                      placeholder="Чернівці, 58012, Україна"
                    />
                  </div>
                </div>
                <h5 className="services-page-colum1-h5">Пакування</h5>
                <div className="rectangle-parent2-services">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11-box">
            <img src="box.png" className="box-image" />
          <b className="box-text">Картонна коробка</b>
          </div>
          <div ref={dropdownRef} className="dropdown-container-home" onClick={toggleDropdown}>
            {isOpen && (
              <div className="dropdown-list-service1">
                <ul className='dropdown-list-ul-home'>
                  <li className="dropdown-list-li-home" >1</li>
                  <li className="dropdown-list-li-home" >2</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="text-frame" onClick={toggleDropdown}>
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
      </div>

      <div className="count-and-weight">
        <div>
      <h5 className="services-page-colum1-h5">Кількість упакувань</h5>
      <div className="rectangle-parent2-services-count">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11-box">
          <b className="box-text">2</b>
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
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
       
      </div>
      </div>
      <div>
      <h5 className="services-page-colum1-h5">Вага</h5>
      <div className="rectangle-parent2-services-weight">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11-box">
          <b className="box-text">12 кг</b>
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
      <h5 className="services-page-colum1-h5-1">Спосіб доставки</h5>
      <div className="rectangle-parent2-services-way">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11-box">
          <b className="box-text">Звичайна</b>
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
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
      </div>
       
        </div>
        <div className="frame-wrapper1-edit">
              <button className="group-button-services">
                <div className="frame-child1" />
                <b className="b1-editAccount">Показати час доставки</b>
              </button>
            </div>
        </div>
        <div className="services-page-colum2">
            <h4 className='edit-page-information-h4'>Наші послуги</h4>
            <div className="service-types">
                <div>
                <h3 className="service-types-h3">Звичайна поштова доставка</h3>
                <p className="service-types-p">самовивіз через відділення</p>
                </div>
                <img src="rocket.png" />
            </div>
            <div className="service-types">
                <div>
                <h3 className="service-types-h3">Спеціалізована доставка</h3>
                <p className="service-types-p">для конретної групи товарів</p>
                </div>
                <img src="rocket1.png" />
            </div>
            <div className="service-types">
                <div>
                <h3 className="service-types-h3">Доставка в поштомат</h3>
                <p className="service-types-p">самовивіз - поштові скриньки</p>
                </div>
                <img src="rocket2.png" />
            </div>
            <div className="service-types">
                <div style={{ marginRight: '20px' }}>
                <h3 className="service-types-h3">Кур’єрська доставка</h3>
                <p className="service-types-p">прямо до дверей клієнта</p>
                </div>
                <img src="rocket3.png" />
            </div>
            <div className="service-types">
                <div>
                <h3 className="service-types-h3">Супер швидка доставка</h3>
                <p className="service-types-p">поза чергою</p>
                </div>
                <img src="rocket4.png" />
            </div>
        </div>
        <div className="services-page-colum3">
            <div className="services-page-column3-row1">
                <div className="services-page-column3-row1-title">
                    <img src="list-colum3.png" className="list-colum3-image"/>
                    <h4 className='edit-page-information-h4'>Доставка</h4>
                </div>
                <p className="edit-page-information-p" style={{ marginTop: '30px' }}>Наші продукти Express надають послуги експрес-вивезення та доставки посилок і документів для бізнес-клієнтів із глобальним охопленням і місцевими командами, що забезпечують швидку доставку з наскрізним відстеженням.</p>
                <div className="rectangle-parent2-services-city">
        <div className="frame-child3-home" />
        <div className="rectangle-group1-home">
          <div className="div11-box">
            <img src="location-services.png" className="location-services-image" />
          <b className="box-text">Виберіть ваше місто</b>
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
        </div>
        <img
          className="rectangle-frame-icon"
          alt=""
          src="/rectangle-frame.svg"
          onClick={toggleDropdown}
        />
      </div>
            </div>
            <div className="services-page-column3-row2">
            <div className="services-page-column3-row1-title">
                    <img src="rocket-white.png" className="list-colum3-image"/>
                    <h4 className='edit-page-information-h4'>Міжнародна оставка</h4>
                </div>
                <p className="edit-page-information-p" style={{ marginTop: '30px' }}>Незабаром!</p>
            </div>
        </div>
      
    </div>
  );
}

export default Services;
