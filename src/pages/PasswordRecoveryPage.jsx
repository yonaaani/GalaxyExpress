import React, { useCallback, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import FrameComponent1 from "../components/FrameComponent1";

const PasswordRecoveryPage = () => {
  const [accountId, setAccountId] = useState("");
  const [token, setToken] = useState("");
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType1, setPasswordType1] = useState('password');

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accountIdParam = searchParams.get("accountId");
    const tokenParam = searchParams.get("token");
    if (accountIdParam && tokenParam) {
      setAccountId(accountIdParam);
      setToken(tokenParam);
      console.log(accountIdParam);
      console.log(tokenParam);
    } else {
      console.error("AccountId and Token parameters are missing");
    }
  }, [location.search]);

  const isValidPassword = (password) => {
    // Мінімальна та максимальна довжина пароля
    const minLength = 8;
    const maxLength = 20;
  
    // Перевірка мінімальної та максимальної довжини
    if (password.length < minLength || password.length > maxLength) {
      return false;
    }
  
    // Перевірка наявності цифр
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Перевірка наявності букв верхнього регістру
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Перевірка наявності букв нижнього регістру
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Перевірка наявності спеціальних символів
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return false;
    }
  
    return true;
  };
  
  const handlePasswordRecoverySubmit = async () => {
    if (!isValidPassword(password)) {
      setError('Пароль повинен містити принаймні 8 символів, включаючи цифри, букви верхнього та нижнього регістру, і спеціальні символи.');
      setSuccess('');
      return;
    }
  
    if (password === confirmPassword) {
      try {
        const formData = new FormData();
        formData.append("UserId", accountId);
        formData.append("Token", token);
        formData.append("Password", password);
        formData.append("ConfirmPassword", confirmPassword);
  
        const response = await fetch('http://localhost:4443/api/User/ResetPassword', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setSuccess(data.message);
          console.log('Паролі змінені успішно')
          window.location.href = '/authorization';
        } else {
          const data = await response.json();
          setError(data.message || 'Помилка зміни пароля');
          setSuccess('');
        }
      } catch (error) {
        console.error('An error occurred while updating password:', error);
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    } else {
      setError('Паролі не співпадають');
      setSuccess('');
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
        <div className="frame-wrapper11">
          <div className="parent">
            <h3 className="h3">Відновлення паролю</h3>
            <div className="divv">Введіть новий пароль двічі</div>
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
            <img
              className="image-36-icon-reg"
              alt=""
              src="/image-22@2x2.png"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            />
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
            <img
              className="image-36-icon-reg"
              alt=""
              src="/image-22@2x2.png"
              onClick={togglePasswordVisibility1}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="frame-wrapper1">
          <button className="group-button-auth" onClick={handlePasswordRecoverySubmit}>
            <div className="frame-child1" />
            <b className="b1">Змінити пароль</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
