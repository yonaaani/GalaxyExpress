import React, { useState } from "react";
import "./EditAccountPage.css";
import { Gear, Logo } from "../images/index";
import { Link } from "react-router-dom";

const EditAccountPage = () => {

    
  return (
    <div className="editAccountPage">
      <div className="slidebar"> 
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="edit-profile-text">
          <img src="profile-image.png" className="profile-image-edit"/>
          <h1 className="edit-profile-text-h1">Профіль</h1>
        </div>
        <div className="edit-profile-photo">
          o
        </div>
        <h5 className="edit-profile-username">Ivanna Stashko</h5>
        <p className="edit-profile-p">Редагувати персональні дані</p>
        <hr />
        <h5 className="edit-profile-contact-data">Контактні дані</h5>
        <p className="edit-profile-p2">Редагувати номер та email</p>
        <hr />
        <h5 className="edit-profile-contact-data">Змінити пароль</h5>
        <div className="sidebar-box">0</div>
        <div className="container-delete-account">
          <img src="trash.png" className="trash-image"/>
          <h5 className="edit-profile-delete">Видалити профіль</h5>
        </div>
      </div>
      <div className="edit-page">
        <div className="header-edit">
          <Link to="/general"><img src="button-exit-edit.png" /></Link>
          <p className="exit-text-edit">Назад до кабінету</p>
          <img className='header__right__gear-edit' src={Gear} alt="" />
        </div>
        <div className="edit-page-information">
          <div className="edit-page-information-column1">

          </div>
          <div className="edit-page-information-column2">
            <div className="edit-page-contact-data">

            </div>
            <div className="edit-page-password-data">

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAccountPage;