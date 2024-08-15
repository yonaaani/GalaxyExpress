import React, { useState, useEffect, useRef } from "react";
import "./EditAccountPage.css";
import { Gear, Logo } from "../images/index";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useJwt } from 'react-jwt';

const PhoneNumberInput = ({ index, value, onChange }) => {
  return (
    <div className="rectangle-parent-edit" key={index}>
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
    <div className="rectangle-parent-edit">
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

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType1, setPasswordType1] = useState('password');
  const [passwordType2, setPasswordType2] = useState('password');

  const token = localStorage.getItem('authToken');
  const { decodedToken, isExpired } = useJwt(token);

  const [gender, setGender] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [formState, setFormState] = useState({
    login: '',
    lastName: '',
    firstName: '',
    fatherName: '',
    birthdate: null,
    gender: '',
  });

  const handleFathernameCheckboxChange = () => {
    setIsFathernameVisible((prevVisible) => !prevVisible);
    if (isFathernameVisible) {
      setFormState((prevState) => ({ ...prevState, fatherName: '' }));
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // оновлюємо значення обраної дати
  };
  
  const handleVerificationCodeKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Викликати функцію, яка обробляє підтвердження коду
      // Наприклад, якщо вам потрібно відправити код на сервер для перевірки
      console.log('Код підтвердження:', verificationCode);
    }
  };

  const handleAddNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
    setShowAddButton(phoneNumbers.length < 1); // Show the add button only if there's less than 1 number
    setShowVerificationCodeInput(true);
  };

  const handleChangeNumber = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
    setShowAddButtonEmail(emails.length < 1); // Show the add button only if there's less than 1 email
  };

  const handleChangeEmail = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
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

  const togglePasswordVisibility2 = () => {
    setPasswordType2((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    setFormState((prevState) => ({ ...prevState, gender: selectedGender }));
  };
  
  const GenderEnum = {
    NOT_SELECTED: 0,
    MALE: 1,
    FEMALE: 2
  };

  useEffect(() => {
    if (decodedToken && !isExpired) {
      const { Login, LastName, FirstName, FatherName, Birthday, Gender, ImageDirectory } = decodedToken;
      let date = null;
      if (Birthday) {
        const [day, month, year] = Birthday.split('.'); // Припускаю, що формат дати у токені - день.місяць.рік
        date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + 1);
      }
      setFormState(prevState => ({
        ...prevState,
        login: Login || '',
        lastName: LastName || '',
        firstName: FirstName || '',
        fatherName: FatherName || '',
        birthdate: date,
        gender: Gender === 'NotSelected' ? 'Не вибрано' : (Gender || ''),
        imageDirectory: ImageDirectory || ''
      }));
      setSelectedDate(date ? date.toISOString().split('T')[0] : null); 
      setGender(Gender === 'NotSelected' ? 'Не вибрано' : Gender);
      setIsFathernameVisible(!!FatherName);
    } else {
      setIsFathernameVisible(false);
    }
  }, [decodedToken, isExpired]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!formState.login || !formState.lastName || !formState.firstName || !selectedDate || !gender) {
            throw new Error("Please fill in all required fields.");
        }

        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        const formData = new FormData();
        formData.append("UserId", userId);
        formData.append("Login", formState.login);
        formData.append("LastName", formState.lastName);
        formData.append("FirstName", formState.firstName);
        formData.append("FatherName", formState.fatherName);
        formData.append("Birthday", new Date(selectedDate).toISOString());
        formData.append("Gender", formState.gender);

        if (selectedFile) {
            formData.append("ImageDirectory", selectedFile);
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await fetch("http://localhost:4443/api/User", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        if (responseData.isSuccess) {
            console.log("User updated successfully");
            console.log("New Access Token:", responseData.accessToken);
            localStorage.removeItem("authToken");
            localStorage.setItem("authToken", responseData.accessToken);
        } else {
            console.error("Error updating user:", responseData.message);
        }
    } catch (error) {
        console.error("Error updating user:", error.message);
        setFormError(error.message);
    }
};

  const handleSubmit1 = async (e) => {
    e.preventDefault();
  
    try {
      if (!oldPassword || !password || !confirmPassword) {
        throw new Error("Please fill in all password fields.");
      }
  
      if (password !== confirmPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  
      const formData = new FormData();
      formData.append("UserId", userId);
      formData.append("OldPassword", oldPassword);
      formData.append("NewPassword", password);
      formData.append("ConfirmNewPassword", confirmPassword);
  
      const response = await fetch("http://localhost:4443/api/User/ChangePassword", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      if (responseData.isSuccess) {
        console.log("Password changed successfully");
        setPasswordChanged(true);
      } else {
        console.error("Error changing password:", responseData.message);
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
      setFormError(error.message);
    }
  };
  
  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const response = await fetch(`http://localhost:4443/api/PhoneNumber/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch phone numbers");
        }
  
        const data = await response.json();
        if (Array.isArray(data)) {
          setPhoneNumbers(data);
        } else {
          throw new Error("Invalid phone number data format");
        }
      } catch (error) {
        console.error("Error fetching phone numbers:", error.message);
        setFormError("Failed to fetch phone numbers");
      }
    };

    const fetchEmails = async () => {
      try {
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const response = await fetch(`http://localhost:4443/api/Email/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setEmails(data);
        } else {
          throw new Error("Invalid email data format");
        }
      } catch (error) {
        console.error("Error fetching emails:", error.message);
        setFormError("Failed to fetch emails");
      }
    };

    fetchPhoneNumbers();
    fetchEmails();
  }, [decodedToken]);
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Створюємо об'єкт URL для зображення
      const imageUrl = URL.createObjectURL(selectedFile);
      
      // Створюємо посилання для завантаження файлу
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = selectedFile.name;
      downloadLink.click();
      console.log('Файл збережено');
    } else {
      console.log('Файл не вибрано.');
    }
  };

  // useEffect(() => {
  //   const dropboxBaseUrl = 'https://api.dropboxapi.com/2/files';
  //   const accessToken = 'token from DropBox';
    
  //   const headers = {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${accessToken}`
  //   };
    
  //   const downloadFileFromDropbox = async (filePath) => {
  //     try {
  //         const response = await fetch(
  //             `${dropboxBaseUrl}/get_temporary_link`,
  //             {
  //                 method: 'POST',
  //                 headers: headers,
  //                 body: JSON.stringify({ path: filePath })
  //             }
  //         );

  //         if (!response.ok) {
  //             throw new Error('Error getting temporary link from Dropbox');
  //         }

  //         const data = await response.json();
  //         const link = data.link; // Отримане посилання
  //         setDropboxLink(link); // Зберігаємо посилання в стані
  //         console.log('Temporary link from Dropbox:', link);
  //         return link;
  //     } catch (error) {
  //         console.error('Error getting temporary link from Dropbox:', error);
  //         throw error;
  //     }
  //   };

  //   downloadFileFromDropbox();
  // }, []); 
  
  const deleteUser = async () => {
    try {
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const response = await fetch(`http://localhost:4443/api/User/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      if (responseData.isSuccess) {
        console.log('User deleted successfully');
        window.location.href = '/';
      } else {
        console.error('Error deleting user:', responseData.message);
        // Додаткові дії, якщо видалення не вдалося
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
      // Додаткові дії в разі виникнення помилки
    }
  };

  return (
    <div className="editAccountPage">
      <div className="slidebar">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="edit-profile-text">
          <img src="profile-image.png" className="profile-image-edit" />
          <h1 className="edit-profile-text-h1">Профіль</h1>
        </div>
        <div className="edit-profile-photo" style={{ backgroundImage: `url(${formState.imageDirectory})` }}>
        
          </div>

        <h5 className="edit-profile-username">{formState.firstName} {formState.lastName}</h5>
        <p className="edit-profile-p">Редагувати персональні дані</p>
        <hr />
        <h5 className="edit-profile-contact-data">Контактні дані</h5>
        <p className="edit-profile-p2">Редагувати номер та email</p>
        <hr />
        <h5 className="edit-profile-contact-data">Змінити пароль</h5>
        <div className="sidebar-box">0</div>
        <div className="container-delete-account" onClick={deleteUser}>
          <img src="trash.png" className="trash-image" />
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
                    name="login"
                    placeholder=""
                    value={formState.login || ''}
                    onChange={handleChange}
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
                    name="lastName"
                    placeholder=""
                    value={formState.lastName || ''}
                    onChange={handleChange}
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
                    name="firstName"
                    placeholder=""
                    value={formState.firstName || ''}
                    onChange={handleChange}
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
                      name="fatherName"
                      placeholder=""
                      value={formState.fatherName || ''}
                      onChange={handleChange}
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
                Немає по батькові в документах
              </label>
              <p className="edit-page-information-p">Інша додаткова інформація про вас, додається за бажанням для кращого орієнтування серед наших клієнтів</p>
              <div className="frame-wrapper-reg">
                <div className="rectangle-parent-birthday">
                  <div className="frame-item-reg" />
                  <div className="country-code-wrapper-reg">
                    <b className="country-code-reg">Дата народження</b>
                  </div>
                  <input
            type="date"
            className="birthday-edit"
            placeholder=""
            value={selectedDate || ''}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
                  
                </div>
              </div>
              <div className="form-group">
              <label htmlFor="gender" style={{marginTop: "10px"}}>Стать</label>
              <select
  id="gender"
  name="gender"
  className="selector-gender"
  value={formState.gender}
  onChange={handleGenderChange}
>
  <option value="NotSelected">Не вибрано</option>
  <option value="Male">Чоловік</option>
  <option value="Female">Жінка</option>
</select>
            </div>


            <div className="photo-download">
      <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }} 
          onChange={handleFileChange}
          id="fileInput"
      />
      <label htmlFor="fileInput" className="fileInput">
        <img
            src="download.png"
            className="download-image"
            alt="Download"
        />
        <p className="photo-download-text" onClick={handleUpload}>Завантажити фото</p>
      </label>
    </div>

            
              <div className="buttons-editAccount">
                <div className="frame-wrapper1-edit">
                  <button className="group-button-editAccount2">
                    <div className="frame-child1" />
                    <b className="b1">Скасувати</b>
                  </button>
                </div>

                <div className="frame-wrapper1-edit" onClick={handleSubmit}>
                  <button className="group-button-editAccount">
                    <div className="frame-child1" />
                    <b className="b1-editAccount">Зберегти</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="edit-page-information-column2">
            <div className="edit-page-contact-data">
              <h4 className='edit-page-information-h4'>Контактні дані</h4>
              <p className="edit-page-information-p">Номер телефонів використовується для входу в профіль, відновлення доступу та для відправки важливих повідомлень. </p>
              <div className="group-editAccount">
              {phoneNumbers.map((number, index) => (
  <div key={`phone-${index}`} className="frame-wrapper-reg">
    <PhoneNumberInput
      index={index}
      value={number.number}
      onChange={handleChangeNumber}
    />
  </div>
))}
                {showAddButton && showVerificationCodeInput ? (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Введіть номер телефону"
          />
          <input
            type="text"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            onKeyPress={handleVerificationCodeKeyPress}
            placeholder="Введіть код підтвердження"
          />
        </div>
      ) : (
        <div className="add-new-number" onClick={handleAddNumber}>
          <img src="add-button.png" className="add-button-image" alt="Add" />
          <p className="add-new-number-text">Додати номер телефону</p>
        </div>
      )}
              </div>
              <p className="edit-page-information-p">Email використовуються для відновлення доступу та для відправки важливих повідомлень  </p>
              <div className="group-editAccount">
              {emails.map((email, index) => (
  <div key={`email-${index}`} className="frame-wrapper-reg">
    <EmailInput
      index={index}
      value={email.emailAddress}
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
                  <div className="rectangle-parent-edit">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Старий пароль</b>
                    </div>
                    <input
                      className="password-reg3"
                      placeholder=""
                      type={passwordType2}
                      value={oldPassword || ''}
                      onChange={handleOldPasswordChange}
                    />
                    <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                      onClick={togglePasswordVisibility2}
                      style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-edit">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Пароль</b>
                    </div>
                    <input
                      className="password-reg"
                      placeholder=""
                      type={passwordType}
                      value={password || ''}
                      onChange={handlePasswordChange}
                    />
                    <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-edit">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Повторіть пароль</b>
                    </div>
                    <input
                      className="password-reg2"
                      placeholder=""
                      type={passwordType1}
                      value={confirmPassword || ''}
                      onChange={handleConfirmPasswordChange}
                    />
                    <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                      onClick={togglePasswordVisibility1}
                      style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
              {passwordChanged && <p style={{ color: 'green', textAlign: 'center', fontSize: '10px' }}>Ваш пароль успішно змінено!</p>} {/* Додаємо вивід повідомлення про успішну зміну пароля */}
              <div className="buttons-editAccount-contact-data">
                <div className="frame-wrapper1-edit">
                  <button className="group-button-editAccount2">
                    <div className="frame-child1" />
                    <b className="b1">Скасувати</b>
                  </button>
                </div>

                <div className="frame-wrapper1-edit" onClick={handleSubmit1}>
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
