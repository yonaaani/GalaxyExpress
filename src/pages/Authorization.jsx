import React, { useCallback, useState } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import "./Authorization.css";
import { Link } from "react-router-dom";

const Authorization = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [email, setEmail] = useState('');
  const [accountId, setAccountId] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isLoginRecovery, setIsLoginRecovery] = useState(false);
  const [isadditionalContent, setAdditionalContent] = useState(false);
  const [isadditionalContent2, setAdditionalContent2] = useState(false);

  const handlePasswordRecoveryClick = useCallback(() => {
    setIsPasswordRecovery(true);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('Login', login);
    formData.append('Password', password);

    try {
      const response = await fetch('http://localhost:4443/api/User/Login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setSuccess('Успішний вхід');
        setError('');
        localStorage.setItem('authToken', data.accessToken);
        window.location.href = '/general';
      } else {
        const data = await response.json();
        setError(data.message || 'Не вдалося увійти');
        setSuccess('');
      }
    } catch (error) {
      setError('Сталася помилка. Спробуйте пізніше.');
      setSuccess('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAccountIdChange = (e) => {
    setAccountId(e.target.value);
  };

  const handleContinueClick = () => {
    setAdditionalContent(true);
  };

  const handleContinueClick2 = () => {
    setAdditionalContent2(true);
  };


  const handlePasswordRecoverySubmit = async () => {
    if (email && accountId) {
      try {
        const formData = new FormData();
        formData.append('UserId', accountId);
        formData.append('Email', email);
  
        const response = await fetch('http://localhost:4443/api/User/ForgotPassword', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            setSuccess(data.message || 'Інструкції для відновлення пароля надіслано на ваш email.');
            setError('');
            setIsLoginRecovery(false);
            setIsPasswordRecovery(false);
            handleContinueClick2();
          } else {
            setError(data.message || 'Не вдалося відновити пароль.');
            setSuccess('');
          }
        } else {
          setError('Не вдалося відновити пароль. Спробуйте пізніше.');
          setSuccess('');
        }
      } catch (error) {
        setError('Сталася помилка. Спробуйте пізніше.');
        setSuccess('');
      }
    } else {
      setError('Будь ласка, введіть ваш email та account ID.');
    }
  };

  const handleLoginRecoverySubmit = async () => {
    if (accountId) {
      try {
        const response = await fetch(`http://localhost:4443/api/User/ForgotLogin/${accountId}`, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            setSuccess(data.message || 'Login recovery instructions have been sent to your email.');
            setError('');
            setIsLoginRecovery(false);
            setIsPasswordRecovery(false);
            handleContinueClick();
          } else {
            setError(data.message || 'Failed to recover login.');
            setSuccess('');
          }
        } else {
          setError('Failed to recover login. Please try again later.');
          setSuccess('');
        }
      } catch (error) {
        console.error('An error occurred while recovering login:', error);
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    } else {
      setError('Please enter your account ID.');
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
                  {isEmailConfirmed ? 'На вказаний email було відправлено лист з інструкцією по відновленню вашого ' + (isPasswordRecovery ? 'пароля' : 'логіна') : `Введіть ваш ${isPasswordRecovery ? 'Email та AccountId' : 'AccountId'} для відновлення`}
                </div>
              </div>
            </div>
            {!isEmailConfirmed ? (
              <>
                {isPasswordRecovery && (
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
                    </div>
                  </div>
                )}
                <div className="frame-wrapper-reg">
                  <div className="rectangle-parent-reg2">
                    <div className="frame-item-reg" />
                    <div className="country-code-wrapper-reg">
                      <b className="country-code-reg">AccountId</b>
                    </div>
                    <input
                      className="accountId-reg"
                      placeholder=""
                      value={accountId}
                      onChange={handleAccountIdChange}
                    />
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="frame-wrapper1">
                  <button className="group-button-auth" onClick={isPasswordRecovery ? handlePasswordRecoverySubmit : handleLoginRecoverySubmit}>
                    <div className="frame-child1" />
                    <b className="b1">Продовжити</b>
                  </button>
                </div>
              </>
            ) : isadditionalContent  ? (
              <>
                <div className="frame-wrapper11">
                  <div className="divv">
                    Якщо Ви не бачите лист в поштовій скриньці, спробуйте перевірити спам-папку. Або скористайтесь формою відновлення {isPasswordRecovery ? 'пароля' : 'логіна'} ще раз.
                  </div>
                </div>
              </>
           ) : null }
          </>
        )  : isadditionalContent  ? (
          <div>
           <h3 className="h3-text">Відновлення логіна</h3>
              <p className="divv">
              На вказаний email було відправлено лист з інструкцією по відновленню вашого логіна.
              </p>
              <p className="divv">
                Якщо Ви не бачите лист в поштовій скриньці, спробуйте перевірити спам-папку. Або скористайтесь формою відновлення логіна ще раз.
              </p>
          </div>
      )  : isadditionalContent2  ? (
        <div>
         <h3 className="h3-text">Відновлення паролю</h3>
            <p className="divv">
            На вказаний email було відправлено лист з інструкцією по відновленню вашого пароля.
            </p>
            <p className="divv">
              Якщо Ви не бачите лист в поштовій скриньці, спробуйте перевірити спам-папку. Або скористайтесь формою відновлення пароля ще раз.
            </p>
        </div>
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
