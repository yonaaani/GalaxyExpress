import { useCallback, useState, useEffect } from "react";
import "./Registration.css";
import { Link } from "react-router-dom";

const Registration = () => {
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType1, setPasswordType1] = useState('password');
  const [phoneNumber, setPhoneNumber] = useState('+380');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const [confirmationCode, setConfirmationCode] = useState('');
  const [isPhoneNumberConfirmationStep, setIsPhoneNumberConfirmationStep] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState('');

  const [isConfirmationStep1, setIsConfirmationStep1] = useState(true);
  const [isFathernameVisible, setIsFathernameVisible] = useState(true);
  const [login, setLogin] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [groupClass, setGroupClass] = useState('group-reg');

  const [isConfirmationStep2, setIsConfirmationStep2] = useState(true);
  const [email, setEmail] = useState('');

  const closeConfirmationStep = useCallback(() => {
    setIsConfirmationStep(false);
  }, []);

  const closeConfirmationPhoneStep = useCallback(() => {
    setIsPhoneNumberConfirmationStep(false);
  }, []);

  const closeConfirmationStep1 = useCallback(() => {
    setIsConfirmationStep1(true);
  }, []);

  const closeConfirmationStep2 = useCallback(() => {
    setIsConfirmationStep2(true);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const togglePasswordVisibility1 = () => {
    setPasswordType1((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const generateSixDigitCode = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };  

  const sendSMS = async (phoneNumber, message) => {
    const data = new FormData();
    data.append('SendTo', phoneNumber);
    data.append('Message', message);
  
    try {
      const response = await fetch('http://localhost:4443/api/PhoneNumber', {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        console.log('SMS sent successfully');
      } else {
        console.error('Failed to send SMS');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const onGroupContainer2Click = useCallback(() => {
    if (phoneNumber.trim() === '') {
      setPasswordError('Будь ласка, введіть номер');
      return;
    } else {
      setFormError('');
      const code = generateSixDigitCode(); // Генеруємо шестизначний код
      console.log('Generated code:', code);
      localStorage.setItem('codeHash', code.toString());

      const savedCodeHash = localStorage.getItem('codeHash');
      console.log('Saved code hash:', savedCodeHash);
      const message = 'Ваш код для підтвердження: ' + savedCodeHash;

      sendSMS(phoneNumber.replace('+', ''), message);

      setIsConfirmationStep(true);
      setIsPhoneNumberConfirmationStep(true);
    }
  }, [phoneNumber]);
  

  const NextPage = useCallback(() => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setPasswordError('Будь ласка, введіть і підтвердіть пароль');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Паролі не співпадають');
      return;
    }
    setPasswordError('');
    setIsConfirmationStep1(false);
  }, [password, confirmPassword]);

  const NextPage1 = useCallback(() => {
    if (
      login.trim() === '' ||
      surname.trim() === '' ||
      name.trim() === '' ||
      (isFathernameVisible && fatherName.trim() === '')
    ) {
      setFormError('Будь ласка, заповніть всі необхідні поля');
      return;
    }
    setFormError('');
    setIsConfirmationStep2(false);
  }, [login, surname, name, fatherName, isFathernameVisible]);

  const onGroupContainer2Click1 = useCallback(() => {
    if (password === confirmPassword) {
      setIsConfirmationStep(true);
      setPasswordError('');
    } else {
      setPasswordError('Паролі не співпадають');
    }
  }, [password, confirmPassword]);

  const handlePhoneNumberChange = (e) => {
    // Перевіряємо, чи введений номер телефону починається з +380
    const inputValue = e.target.value;
    if (inputValue.startsWith('+380')) {
      // Якщо так, просто оновлюємо стан з введеним значенням
      setPhoneNumber(inputValue);
    } else {
      // Якщо ні, додаємо префікс країни до введеного значення та оновлюємо стан
      setPhoneNumber('+380' + inputValue);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFathernameCheckboxChange = () => {
    setIsFathernameVisible((prevVisible) => !prevVisible);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFatherNameChange = (e) => {
    setFatherName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  useEffect(() => {
    if (isConfirmationStep) {
      setGroupClass('group-reg3');
    } else {
      setGroupClass('group-reg');
    }
  }, [isConfirmationStep]);

  const handleSubmit = async () => {
    if (!isConfirmationStep2) {
      const data = new FormData();
      data.append('PhoneNumber', phoneNumber);
      data.append('Login', login);
      data.append('Password', password);
      data.append('ConfirmPassword', confirmPassword); // Якщо у вас є підтвердження пароля
      data.append('FirstName', name);
      data.append('LastName', surname);
      data.append('FatherName', fatherName);
      data.append('Email', email);
  
      console.log("Sending registration data:", Object.fromEntries(data.entries())); // Виведення даних у консоль перед відправкою
  
      try {
        const response = await fetch('http://localhost:4443/galaxy-express/User/Register', {
          method: 'POST',
          body: data,
        });
  
        const result = await response.json();
  
        if (response.ok && result.isSuccess) {
          alert('Реєстрація успішна');
        } else {
          const errorMessage = result.errors.length > 0 ? result.errors.join(', ') : 'Помилка реєстрації';
          setFormError(errorMessage);
        }
      } catch (error) {
        console.error(error);
        setFormError('Помилка сервера');
      }
    }
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          clearInterval(interval); // Зупиняємо інтервал при досягненні нуля
          setIsConfirmationStep(false);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Прибираємо інтервал при виході з компонента
    return () => clearInterval(interval);
  }, []);

  const verifyConfirmationCode = () => {
    const savedCodeHash = localStorage.getItem('codeHash');

    if (confirmationCode === savedCodeHash) {
      console.log('Підтвердження пройшло')
     
      setIsPhoneNumberConfirmationStep(false);
    } else {
      // Показати помилку користувачу
      setError('Помилка: код підтвердження не співпадає');
    }
  };


  return (
    <div className="registration">
      <div className="registration-inner">
        <div className="frame-parent-reg">
          <div className="parent-reg">
            <h1 className="h1-reg">Реєстрація</h1>
            <p className="p-reg">
              Зареєструйтесь, щоб отрмати доступ до нових можливостей, замовити
              послуги та сплатити посилку онлайн
            </p>
          </div>
          <div className="ivanna-stashko-wrapper-reg">
            <b className="ivanna-stashko-reg">Ivanna Stashko</b>
          </div>
        </div>
      </div>
      <main className="star-animate-parent-reg">
        <img className="star-animate-icon" alt="" src="/star-animate@2x.png" />
        <img
          className="image-22-icon"
          loading="lazy"
          alt=""
          src="/image-22@2x.png"
        />
        <section className="wrapper-star-animate-parent-reg">
          <div className="wrapper-star-animate-reg">
            <img
              className="star-animate-icon1-reg"
              alt=""
              src="/star-animate-1.svg"
            />
          </div>
          <img
            className="group-5logo-1"
            loading="lazy"
            alt=""
            src="/group-5logo-1@2x.png"
          />
        </section>
        <img className="frame-child-reg" alt="" src="/group-42@2x.png" />
      </main>
      <div className={(isConfirmationStep1 ? "group-reg" : "group-reg3") && (isConfirmationStep2 ? "group-reg" : "group-reg")}>
        {!isConfirmationStep ? (
          <>
            <b className="b-reg">Створити профіль</b>
            <div className="wrapper-reg">
              <div className="div-reg">
                Введіть свій номер телефону та створіть пароль
              </div>
            </div>
            <div className="frame-wrapper-reg">
              <div className="rectangle-parent-reg">
                <div className="frame-item-reg" />
                <img className="image-36-icon-reg" alt="" src="/image-36@2x.png" />
                <input
                  className="ivanna-stashko-reg"
                  placeholder=""
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="input-box-parent-reg" >
                    <div className="input-bo-reg" />
                    <div className="rectangle-group-reg">
                      <div className="frame-inner-reg" />
                      <img className="input-icon-reg" alt="" src="/input-icon.png" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
            <div className="container-reg">
              <p className="p1-reg">
                {`Продовжуючи, я підтверджую що ознайомлений(а) з `}
                <span className="span-reg">Політикою конфіденційності</span> та даю
                згоду на обробку моїх персональних даних
              </p>
            </div>
            <div className="frame-container-reg">
              <div className="rectangle-container-reg" onClick={onGroupContainer2Click}>
                <div className="rectangle-div-reg" />
                <b className="b1-reg">Продовжити</b>
              </div>
            </div>
          </>
          ) : isPhoneNumberConfirmationStep ? (
            <>
            <b className="b-reg">Підтвердіть номер</b>
            <div className="wrapper-reg">
                <div className="div-reg">
                  для номеру {phoneNumber}
                </div>
              </div>
              <div className="frame-wrapper-reg">
                <div className="rectangle-parent-reg">
                  <div className="frame-item-reg" />
                 
                  <input
                    className="confirmationCode-reg"
                    placeholder=""
                    type="text"
                    value={confirmationCode}
                    onChange={handleConfirmationCodeChange}
                  />
                  <div className="input-box-parent-reg">
                    <div className="input-bo-reg" />
                    <div className="rectangle-group-reg" onClick={closeConfirmationStep}>
                      <div className="frame-inner-reg" />
                      <img className="input-icon-reg" alt="" src="/input-icon.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div>Залишилось {seconds} секунд</div>
              <div className="frame-container-reg" onClick={verifyConfirmationCode }>
                <div className="rectangle-container-reg" >
                  <div className="rectangle-div-reg" />
                  <b className="b1-reg">Підтвердити</b>
                </div>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </>
         ) :
          isConfirmationStep1 ? (
            <>
              <b className="b-reg">Створіть пароль</b>
              <div className="wrapper-reg">
                <div className="div-reg">
                  для номеру {phoneNumber}
                </div>
              </div>
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
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
              <div className="frame-container-reg">
                <div className="rectangle-container-reg" onClick={() => { onGroupContainer2Click1(); if (password === confirmPassword) NextPage(); }} >
                  <div className="rectangle-div-reg" />
                  <b className="b1-reg">Продовжити</b>
                </div>
              </div>
            </>
          ) :
            isConfirmationStep2 ? (
              <>
                <b className="b-reg">Особисті дані</b>
                <div className="wrapper-reg">
                  <div className="div-reg">
                    Вкажіть ПІБ так, як написано у паспорті: щоб ви могли надсилати та отримувати посилки, грошові перекази
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Логін</b>
                    </div>
                    <input
                      className="login-reg"
                      placeholder=""
                      value={login}
                      onChange={handleLoginChange}
                    />
                    <div className="input-box-parent-reg">
                      <div className="input-bo-reg" />
                      <div className="rectangle-group-reg" onClick={closeConfirmationStep1}>
                        <div className="frame-inner-reg" />
                        <img className="input-icon-reg" alt="" src="/input-icon.png" />
                      </div>
                    </div>
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
                      value={surname}
                      onChange={handleSurnameChange}
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
                      value={name}
                      onChange={handleNameChange}
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
                        value={fatherName}
                        onChange={handleFatherNameChange}
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
                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                <div className="frame-container-reg">
                  <div className="rectangle-container-reg" onClick={NextPage1}>
                    <div className="rectangle-div-reg" />
                    <b className="b1-reg">Продовжити</b>
                  </div>
                </div>
              </>
            ) : (
              <>
                <b className="b-reg">Захистити свій профіль</b>
                <div className="wrapper-reg">
                  <div className="div-reg">
                    Заповніть один із додаткових контактів (ваш email), щоб за потреби швидше відновити свій профіль.
                  </div>
                </div>
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg2">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">Email</b>
                    </div>
                    <input
                      className="email-reg"
                      placeholder=""
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <div className="input-box-parent-reg">
                      <div className="input-bo-reg" />
                      <div className="rectangle-group-reg" onClick={closeConfirmationStep2}>
                        <div className="frame-inner-reg" />
                        <img className="input-icon-reg" alt="" src="/input-icon.png" />
                      </div>
                    </div>
                  </div>
                </div>
                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                <div className="frame-container-reg">
                  <div className="rectangle-container-reg" onClick={handleSubmit}>
                    <div className="rectangle-div-reg" />
                    <b className="b1-reg">Зареєструватись</b>
                  </div>
                </div>
              </>
            )
          
        
        }
      </div>
    </div>
  );
};

export default Registration;
