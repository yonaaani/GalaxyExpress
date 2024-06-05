import React, { useState } from "react";
import "./EditAccountPage.css";
import { Gear, Logo } from "../images/index";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PhoneNumberInput = ({ index, value, onChange }) => {
  return (
    <div className="rectangle-parent-reg">
      <div className="frame-item-reg" />
      <div className="country-code-wrapper-reg">
        <b className="country-code-reg">Номер {index + 1}</b>
      </div>
      <input
        className="sex-edit"
        placeholder=""
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      />
    </div>
  );
};

const EmailInput = ({ index, value, onChange }) => {
  return (
    <div className="rectangle-parent-reg">
      <div className="frame-item-reg" />
      <div className="country-code-wrapper-reg">
        <b className="country-code-reg">Email {index + 1}</b>
      </div>
      <input
        className="sex-edit"
        placeholder=""
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      />
    </div>
  );
};

const EditAccountPage = () => {
  const [isFathernameVisible, setIsFathernameVisible] = useState(true);
  const [formError, setFormError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [showAddButton, setShowAddButton] = useState(true);

  const [emails, setEmails] = useState(['']);
  const [showAddButtonEmail, setShowAddButtonEmail] = useState(true);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType1, setPasswordType1] = useState('password');

  const handleFathernameCheckboxChange = () => {
    setIsFathernameVisible((prevVisible) => !prevVisible);
  };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleAddNumber = () => {
      setPhoneNumbers([...phoneNumbers, '']);
      setShowAddButton(false); // Ховаємо кнопку після додавання нового поля
    };
  
    const handleChange = (index, value) => {
      const newPhoneNumbers = [...phoneNumbers];
      newPhoneNumbers[index] = value;
      setPhoneNumbers(newPhoneNumbers);
    };

    const handleAddEmail = () => {
      setEmails([...emails, '']);
      setShowAddButtonEmail(false); // Ховаємо кнопку після додавання нового поля
    };
  
    const handleChangeEmail = (index, value) => {
      const newEmails = [...emails];
      newEmails[index] = value;
      setEmails(newEmails);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
      setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };
  
    const togglePasswordVisibility1 = () => {
      setPasswordType1((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };
    
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
            <h4 className='edit-page-information-h4'>Редагувати персональні дані</h4>
            <p className="edit-page-information-p">Редагування персональних даних, які ви ввели під час реєстрації, редагувати персональні дані при змінах</p>
            <div className="group-editAccount">
            <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Логін</b>
                    </div>
                    <input
                      className="login-reg"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg2">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Прізвище</b>
                    </div>
                    <input
                      className="surname-reg"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg2">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Ім'я</b>
                    </div>
                    <input
                      className="name-reg"
                      placeholder=""
                    />
                  </div>
                </div>
                {isFathernameVisible && (
                  <div className="frame-wrapper-reg">
                    <div className="rectangle-parent-reg2">
                      <div className="frame-item-reg" />
                      <div className="country-code-wrapper-reg">
                        <b className="country-code-reg">По батькові</b>
                      </div>
                      <input
                        className="fathername-reg"
                        placeholder=""
                      />
                    </div>
                  </div>
                )}
                <label className="hide-fathername">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={!isFathernameVisible}
                    onChange={handleFathernameCheckboxChange}
                  />
                  Немає по батьків в документах
                </label>
                <p className="edit-page-information-p">Інша додаткова інформація про вас, додається за бажанням для кращого орієнтування серед наших клієнтів</p>
                <div className="frame-wrapper-reg">
                    <div className="rectangle-parent-birthday">
                      <div className="frame-item-reg" />
                      <div className="country-code-wrapper-reg">
                        <b className="country-code-reg">Дата народження</b>
                      </div>
                      <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                        <input
                            className="birthday-edit"
                            placeholder=""
                            value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                        />
                    }
                />
                      <img
                    src="calendar.png"
                    className="calendar-image"
                    onClick={() => document.querySelector('.react-datepicker__input-container input').focus()}
                />
                    </div>
                  </div>
                  <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Стать</b>
                    </div>
                    <input
                      className="sex-edit"
                      placeholder=""
                    />
                </div>
                </div>
                <div className="photo-download">
                  <img src="download.png" className="download-image"/>
                  <p className="photo-download-text">Завантажити фото</p>
                </div>
                </div>
                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                <div className="buttons-editAccount">
                <div className="frame-wrapper1-edit">
              <button className="group-button-editAccount2">
                <div className="frame-child1" />
                <b className="b1">Скасувати</b>
              </button>
            </div>

            <div className="frame-wrapper1-edit">
              <button className="group-button-editAccount">
                <div className="frame-child1" />
                <b className="b1-editAccount">Зберегти</b>
              </button>
            </div>
                </div>
          </div>
          <div className="edit-page-information-column2">
            <div className="edit-page-contact-data">
              <h4 className='edit-page-information-h4'>Контактні дані</h4>
              <p className="edit-page-information-p">Номер телефонів використовується для входу в профіль, відновлення доступу та для відправки важливих повідомлень. </p>
              <div className="group-editAccount">
              {phoneNumbers.map((number, index) => (
                 <div className="frame-wrapper-reg">
        <PhoneNumberInput
          key={index}
          index={index}
          value={number}
          onChange={handleChange}
        />
        </div>
      ))}
      {showAddButton && (
        <div className="add-new-number" onClick={handleAddNumber}>
          <img src="add-button.png" className="add-button-image" alt="Add" />
          <p className="add-new-number-text">Додати номер телефону</p>
        </div>
      )}
            </div>
            <p className="edit-page-information-p">Email використовуються для відновлення доступу та для відправки важливих повідомлень  </p>
            <div className="group-editAccount">
            {emails.map((email, index) => (
                  <div key={index} className="frame-wrapper-reg">
                    <EmailInput
                      index={index}
                      value={email}
                      onChange={handleChangeEmail}
                    />
                  </div>
                ))}
                {showAddButtonEmail && (
                  <div className="add-new-number" onClick={handleAddEmail}>
                    <img src="add-button.png" className="add-button-image" alt="Add" />
                    <p className="add-new-number-text">Додати email</p>
                  </div>
                )}
            </div>
            <div className="buttons-editAccount-contact-data">
                <div className="frame-wrapper1-edit">
              <button className="group-button-editAccount2">
                <div className="frame-child1" />
                <b className="b1">Скасувати</b>
              </button>
            </div>

            <div className="frame-wrapper1-edit">
              <button className="group-button-editAccount">
                <div className="frame-child1" />
                <b className="b1-editAccount">Зберегти</b>
              </button>
            </div>
                </div>

            </div>
            <div className="edit-page-password-data">
              <h4 className='edit-page-information-h4'>Введіть новий пароль</h4>
              <div className="group-editAccount">
              <div className="frame-wrapper-reg">
                <div className="rectangle-parent-reg">
                  <div className="frame-item-reg" />
                  <div className="country-code-wrapper-reg">
                    <b className="country-code-reg">Пароль</b>
                  </div>
                  <input
                    className="password-reg"
                    placeholder=""
                    type={passwordType}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <div className="frame-wrapper-reg">
                <div className="rectangle-parent-reg2">
                  <div className="frame-item-reg" />
                  <div className="country-code-wrapper-reg">
                    <b className="country-code-reg">Повторіть пароль</b>
                  </div>
                  <input
                    className="password-reg2"
                    placeholder=""
                    type={passwordType1}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                    onClick={togglePasswordVisibility1}
                    style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
            <div className="buttons-editAccount-contact-data">
                <div className="frame-wrapper1-edit">
              <button className="group-button-editAccount2">
                <div className="frame-child1" />
                <b className="b1">Скасувати</b>
              </button>
            </div>

            <div className="frame-wrapper1-edit">
              <button className="group-button-editAccount">
                <div className="frame-child1" />
                <b className="b1-editAccount">Зберегти</b>
              </button>
            </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAccountPage;