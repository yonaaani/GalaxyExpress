import React, { useCallback, useState } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import "./Authorization.css";

const Authorization = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoginRecovery, setIsLoginRecovery] = useState(false); // Added

  const handlePasswordRecoveryClick = useCallback(() => {
    setIsPasswordRecovery(true);
  }, []);

  const handleBackToLoginClick = useCallback(() => {
    setIsPasswordRecovery(false);
    setIsEmailConfirmed(false);
    setIsLoginRecovery(false); // Added
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('Login', login);
    formData.append('Password', password);

    console.log("Sending login request with payload:", formData);

    try {
      const response = await fetch('http://localhost:4443/api/User/Login', {
        method: 'POST',
        body: formData,
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received token:", data.accessToken);
        setToken(data.accessToken);
        setSuccess('Login successful');
        setError('');
        localStorage.setItem('authToken', data.accessToken);
        window.location.href = '/general';
      } else {
        const data = await response.json();
        console.error("Login failed. Error message:", data.message || 'Failed to login');
        setError(data.message || 'Failed to login');
        setSuccess('');
      }
    } catch (error) {
      console.error('An error occurred. Please try again later.', error);
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailConfirm = async () => {
    if (email) {
      try {
        // Здійснюємо запит на сервер для отримання списку всіх емейлів
        const response = await fetch('http://localhost:4443/galaxy-express/Email', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          // Перевіряємо, чи введений email знаходиться в списку
          const emailExists = data.some(item => item.emailAddress === email);
          
          if (emailExists) {
            // Якщо email існує в базі, тоді встановлюємо прапорець isEmailConfirmed на true
            setIsEmailConfirmed(true);
            setIsLoginRecovery(true); // Встановлюємо isLoginRecovery на true, якщо це потрібно
          } else {
            setError('Введений email не існує в базі.');
          }
        } else {
          setError('Помилка під час отримання списку емейлів.');
        }
      } catch (error) {
        console.error('An error occurred while fetching email list:', error);
        setError('Помилка під час з\'єднання з сервером.');
      }
    } else {
      setError('Будь ласка, введіть ваш email.');
    }
  };

  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handlePasswordRecoverySubmit = () => {
    if (confirmationCode) {
      // Handle password recovery process with the confirmation code
      // For example, send the confirmation code to the server to verify and allow password reset
    } else {
      setError('Please enter the confirmation code.');
    }
  };

  const handleLoginConfirm = () => {
    if (email) {
      setIsEmailConfirmed(true); // Правильне використання функції setIsEmailConfirmed
      setIsLoginRecovery(true); // Встановлюємо isLoginRecovery на true
    } else {
      setError('Please enter your email address.');
    }
  };

  return (
    <div className="authorization">
      <main className="star-animate-parent">
        <img
          className="image-22-icon"
          loading="lazy"
          alt=""
          src="/image-22@2x.png"
        />
        <section className="wrapper-star-animate-parent">
          <div className="wrapper-star-animate1">
            <img
              className="star-animate-icon1"
              alt=""
              src="/star-animate.svg"
            />
          </div>
          <img
            className="group-5logo-11"
            loading="lazy"
            alt=""
            src="/group-5logo-1@2x.png"
          />
        </section>
      </main>
      <div className="authorization-inner">
        <FrameComponent1 />
      </div>
      <div className="frame-parent11">
        {isPasswordRecovery || isLoginRecovery ? (
          <>
            <div className="frame-wrapper11">
              <div className="parent">
                <h3 className="h3">{isPasswordRecovery ? 'Відновлення паролю' : 'Відновлення логіна'}</h3>
                <div className="divv">
                  {isEmailConfirmed ? 'На вказаний email було відправлено лист з інструкцією по відновленню вашого ' + (isPasswordRecovery ? 'пароля' : 'логіна') : `Введіть ваш ${isPasswordRecovery ? 'Email' : 'Email'} для відновлення`}
                </div>
              </div>
            </div>
            {!isEmailConfirmed ? (
              <>
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
      <div className="rectangle-group-reg" onClick={handleBackToLoginClick}>
        <div className="frame-inner-reg" />
        <img className="input-icon-reg" alt="" src="/input-icon.png" />
      </div>
    </div>
  </div>
</div>
{error && <div className="error-message">{error}</div>}
<div className="frame-wrapper1">
  <button className="group-button-auth" onClick={isPasswordRecovery ? handleEmailConfirm : handleLoginConfirm}>
    <div className="frame-child1" />
    <b className="b1">Продовжити</b>
  </button>
</div>
              </>
            ) : (
              <>
    <div className="frame-wrapper11">
      <div className="divv">
        Якщо Ви не бачите лист в поштовій скриньці, спробуйте перевірити спам-папку. Або скористайтесь формою відновлення {isPasswordRecovery ? 'пароля' : 'логіна'} ще раз.
      </div>
    </div>
  </>
            )}
          </>
        ) : (
          <>
            <div className="frame-wrapper11">
              <div className="parent">
                <h3 className="h3">Вже зареєстровані?</h3>
                <div className="divv">Введіть ваш Логін та Пароль</div>
              </div>
            </div>
            <div className="rectangle-parent-auth">
              <div className="frame-item-auth" />
              <div className="rectangle-group-auth">
                <div className="frame-inner-auth" />
                <b className="b-auth">Логін</b>
                <input
                  className="ivanna-stashko"
                  placeholder=""
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
            </div>
            <div className="frame-container-auth">
              <div className="rectangle-container-auth">
                <div className="rectangle-div-auth" />
                <b className="b-auth">Пароль</b>
                <input
                  className="input"
                  placeholder=""
                  type={passwordType}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  className="image-22-icon1"
                  alt=""
                  src="/image-22@2x2.png"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div className="frame-group-auth">
              <div className="frame-div-auth">
                <div className="group">
                <div className="div1-auth">Забули ваш 
    <span onClick={() => setIsLoginRecovery(true)}> Логін </span> 
    чи 
    <span onClick={handlePasswordRecoveryClick}> Пароль? </span>
  </div>
                  <img
                    className="image-37-icon"
                    loading="lazy"
                    alt=""
                    src="/image-37@2x.png"
                  />
                </div>
              </div>
              <div className="div2-auth">
                Усі права захищено. Використання матеріалів цього сайту можливе
                тільки з посиланням на джерело.
              </div>
            </div>
            <div className="frame-wrapper1">
              <button className="group-button-auth" onClick={handleLogin}>
                <div className="frame-child1" />
                <b className="b1">Увійти</b>
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Authorization;

